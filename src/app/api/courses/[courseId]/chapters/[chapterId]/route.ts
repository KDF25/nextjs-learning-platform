import { Chapter } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/shared/database";

import { authHandler, errorHandler, ownerHandler } from "@/app/api/__handler";

export async function PATCH(
	req: Request,
	{ params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
	try {
		const { courseId, chapterId } = await params;
		const userId = await authHandler();
		await ownerHandler(courseId, userId);

		const values = (await req.json()) as Chapter;

		const chapter = await prisma.chapter.update({
			where: {
				id: chapterId,
				courseId
			},
			data: {
				...values
			}
		});

		return NextResponse.json(chapter);
	} catch (error) {
		errorHandler({
			error,
			route: "PATCH /api/courses/[courseId]/chapters/[chapterId]"
		});
	}
}
