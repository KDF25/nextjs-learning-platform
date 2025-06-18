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

		const chapter = await prisma.chapter.findUnique({
			where: {
				id: chapterId,
				courseId
			}
		});

		const muxData = await prisma.muxData.findUnique({
			where: {
				chapterId
			}
		});

		if (
			!chapter ||
			!muxData ||
			!chapter?.videoUrl ||
			!chapter?.title ||
			!chapter?.description
		) {
			return NextResponse.json(
				{
					message: "Missing required fields"
				},
				{ status: 400 }
			);
		}

		const publishedChapter = await prisma.chapter.update({
			where: {
				id: chapterId,
				courseId
			},
			data: {
				isPublished: true
			}
		});

		return NextResponse.json(publishedChapter);
	} catch (error) {
		errorHandler({
			error,
			route: "PATCH /api/courses/[courseId]/chapters/[chapterId]/unpublish"
		});
	}
}
