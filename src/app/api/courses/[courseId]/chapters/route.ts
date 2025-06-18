import { NextResponse } from "next/server";

import { prisma } from "@/shared/database";

import { ICourseTitleForm } from "@/entities/course";

import { authHandler, errorHandler, ownerHandler } from "@/app/api/__handlers";

export async function POST(
	req: Request,
	{ params }: { params: Promise<{ courseId: string }> }
) {
	try {
		const { courseId } = await params;
		const userId = await authHandler();
		await ownerHandler(courseId, userId);

		const { title } = (await req.json()) as ICourseTitleForm;

		const lastChapter = await prisma.chapter.findFirst({
			where: {
				courseId
			},
			orderBy: {
				position: "desc"
			}
		});
		const newPosition = lastChapter ? lastChapter.position + 1 : 1;

		const chapter = await prisma.chapter.create({
			data: {
				title,
				courseId,
				position: newPosition
			}
		});

		return NextResponse.json(chapter);
	} catch (error) {
		errorHandler({
			error,
			route: "POST /api/courses/[courseId]/chapters"
		});
	}
}
