import { Attachment, Chapter, Course } from "@prisma/client";

import { prisma } from "@/shared/database";

import {
	DashboardUserCourse,
	GetTeacherCourses,
	GetUserCourses,
	GetUserDashboardCourses,
	IChart,
	ICourseBaseData,
	PurchaseCourse
} from "../types";

export const CourseService = {
	async getTeacherCourseById(
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
			console.log("[CourseService] getTeacherCourseById", error);
			return null;
		}
	},

	async getUserCourseById(
		userId: string,
		id: string
	): Promise<GetUserCourses | null> {
		try {
			return await prisma.course.findUnique({
				where: { id },
				include: {
					chapters: {
						where: {
							isPublished: true
						},
						include: {
							userProgress: {
								where: {
									userId
								}
							}
						},
						orderBy: {
							position: "asc"
						}
					}
				}
			});
		} catch (error) {
			console.log("[CourseService] getUserCourseById", error);
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
	}: GetTeacherCourses): Promise<ICourseBaseData[]> {
		try {
			const courses = await prisma.course.findMany({
				where: {
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
	},

	async getUserDashboard(userId: string): Promise<GetUserDashboardCourses> {
		try {
			const purchases = await prisma.purchase.findMany({
				where: {
					userId
				},
				select: {
					course: {
						include: {
							category: true,
							chapters: {
								where: {
									isPublished: true
								}
							}
						}
					}
				}
			});
			const courses = purchases.map(
				(purchase) => purchase.course
			) as DashboardUserCourse[];

			for (const course of courses) {
				const progress = await this.getProgress(userId, course.id);
				course["progress"] = progress;
			}

			const completed = courses.filter(
				(course) => course.progress === 100
			);
			const inProgress = courses.filter(
				(course) => course.progress !== 100
			);

			return {
				completed,
				inProgress
			};
		} catch (error) {
			console.log("[CourseService] getUserDashboard", error);
			return {
				completed: [],
				inProgress: []
			};
		}
	},

	async groupByCourses(purchases: PurchaseCourse[]) {
		const grouped: { [courseTitle: string]: number } = {};

		purchases.forEach((purchase) => {
			const courseTitle = purchase.course.title;
			grouped[courseTitle] =
				(grouped[courseTitle] || 0) + (purchase.course.price || 0);
		});

		return grouped;
	},

	async getTeacherAnalytics(userId: string) {
		try {
			const purchases = await prisma.purchase.findMany({
				where: {
					course: {
						userId
					}
				},
				include: {
					course: true
				}
			});

			const groupEarnings = await this.groupByCourses(purchases);
			const data: IChart[] = Object.entries(groupEarnings).map(
				([courseTitle, price]) => ({
					name: courseTitle,
					total: price
				})
			);

			const totalRevenue = data.reduce(
				(acc, curr) => acc + (curr.total || 0),
				0
			);
			const totalSales = purchases.length;

			return {
				totalRevenue,
				totalSales,
				data
			};
		} catch (error) {
			console.log("[CourseService] getTeacherAnalytics", error);
			return {
				totalRevenue: 0,
				totalSales: 0,
				data: []
			};
		}
	}
};
