import { Attachment, Chapter, MuxData } from "@prisma/client";

import { prisma } from "@/shared/database";

import { GetTeacherChapter, GetUserChapter } from "../types";

export const ChapterService = {
	async getTeacherChapterById(
		userId: string,
		courseId: string,
		chapterId: string
	): Promise<GetTeacherChapter | null> {
		try {
			const course = await prisma.course.findUnique({
				where: { id: courseId, userId }
			});

			if (!course) {
				return null;
			}

			return await prisma.chapter.findUnique({
				where: { id: chapterId, courseId },
				include: {
					muxData: true
				}
			});
		} catch (error) {
			console.log("[ChapterService] getTeacherChapterById", error);
			return null;
		}
	},

	async getUserChapterById(
		userId: string,
		chapterId: string,
		courseId: string
	): Promise<GetUserChapter> {
		try {
			const purchase = await prisma.purchase.findUnique({
				where: { userId_courseId: { userId, courseId } }
			});

			const course = await prisma.course.findUnique({
				where: { id: courseId, isPublished: true },
				select: {
					price: true
				}
			});

			if (!course) {
				throw new Error("Course not found");
			}

			const chapter = await prisma.chapter.findUnique({
				where: { id: chapterId, courseId, isPublished: true }
			});

			if (!chapter) {
				throw new Error("Chapter not found");
			}

			let muxData: MuxData | null = null;
			let attachments: Attachment[] = [];
			let nextChapter: Chapter | null = null;

			if (purchase) {
				attachments = await prisma.attachment.findMany({
					where: {
						courseId
					}
				});
			}

			if (chapter?.isFree || purchase) {
				muxData = await prisma.muxData.findUnique({
					where: {
						chapterId
					}
				});

				nextChapter = await prisma.chapter.findFirst({
					where: {
						courseId,
						isPublished: true,
						position: {
							gt: chapter?.position
						}
					},
					orderBy: {
						position: "asc"
					}
				});
			}

			const userProgress = await prisma.userProgress.findUnique({
				where: {
					userId_chapterId: {
						userId,
						chapterId
					}
				}
			});

			return {
				chapter,
				course,
				muxData,
				attachments,
				nextChapter,
				userProgress,
				purchase
			};
		} catch (error) {
			console.log("[ChapterService] getUserChapterById", error);
			return {
				chapter: null,
				course: null,
				muxData: null,
				attachments: [],
				nextChapter: null,
				userProgress: null,
				purchase: null
			};
		}
	}
};
