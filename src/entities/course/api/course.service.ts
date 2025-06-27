import { Attachment, Chapter, Course } from "@prisma/client";

import { prisma } from "@/shared/database";

import { GetCourses, ICourseBaseData } from "../types";

export const CourseService = {
	async getById(
		userId: string,
		id: string
	): Promise<
		| (Course & { attachments: Attachment[] } & { chapters: Chapter[] })
		| null
	> {
		try {
			return await prisma.course.findUnique({
				where: { id, userId },
				include: {
					chapters: {
						orderBy: {
							position: "asc"
						}
					},
					attachments: {
						orderBy: {
							createdAt: "desc"
						}
					}
				}
			});
		} catch (error) {
			console.log("[CourseService] getById", error);
			return null;
		}
	},

	async getAll(userId: string): Promise<Course[]> {
		try {
			return await prisma.course.findMany({
				where: { userId },
				orderBy: {
					createdAt: "desc"
				}
			});
		} catch (error) {
			console.log("[CourseService] getAll", error);
			return [];
		}
	},

	async getProgress(userId: string, courseId: string): Promise<number> {
		try {
			const publishedChapters = await prisma.chapter.findMany({
				where: {
					courseId,
					isPublished: true
				},
				select: {
					id: true
				}
			});

			const publishedChaptersIds = publishedChapters.map(
				(chapter) => chapter.id
			);

			const validCompletedChapters = await prisma.userProgress.count({
				where: {
					userId,
					chapterId: {
						in: publishedChaptersIds
					},
					isCompleted: true
				}
			});

			const progress =
				(validCompletedChapters / publishedChapters.length) * 100;

			return progress;
		} catch (error) {
			console.log("[CourseService] getProgress", error);
			return 0;
		}
	},

	async getCourses({
		userId,
		title,
		categoryId
	}: GetCourses): Promise<ICourseBaseData[]> {
		try {
			const courses = await prisma.course.findMany({
				where: {
					userId,
					title: {
						search: title
					},
					categoryId,
					isPublished: true
				},
				include: {
					category: true,
					chapters: {
						where: {
							isPublished: true
						},
						select: {
							id: true
						}
					},
					purchases: {
						where: {
							userId
						}
					}
				},
				orderBy: {
					createdAt: "desc"
				}
			});

			if (!courses.length) {
				return [];
			}

			const coursesWithProgress = await Promise.all(
				courses.map(async (course) => {
					if (course.purchases.length === 0) {
						return {
							...course,
							progress: null
						};
					}

					return {
						...course,
						progress: await this.getProgress(userId, course.id)
					};
				})
			);

			return coursesWithProgress;
		} catch (error) {
			console.log("[CourseService] getCourses", error);
			return [];
		}
	}
};
