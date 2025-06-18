import { NextResponse } from "next/server";

import { prisma } from "@/shared/database";

import { authHandler, errorHandler, ownerHandler } from "@/app/api/__handlers";

export async function PATCH(
	req: Request,
	{ params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
	try {
		const { courseId, chapterId } = await params;
		const userId = await authHandler();
		await ownerHandler(courseId, userId);

		const unpublishChapter = await prisma.chapter.update({
			where: {
				id: chapterId,
				courseId
			},
			data: {
				isPublished: false
			}
		});

		const publishedChaptersInCourse = await prisma.chapter.findMany({
			where: {
				courseId,
				isPublished: true
			}
		});

		if (!publishedChaptersInCourse.length) {
			await prisma.course.update({
				where: {
					id: courseId
				},
				data: {
					isPublished: false
				}
			});
		}

		return NextResponse.json(unpublishChapter);
	} catch (error) {
		errorHandler({
			error,
			route: "PATCH /api/courses/[courseId]/chapters/[chapterId]/unpublish"
		});
	}
}
