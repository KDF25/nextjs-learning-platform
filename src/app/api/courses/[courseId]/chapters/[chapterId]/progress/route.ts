import { NextResponse } from "next/server";

import { prisma } from "@/shared/database";

import { authHandler, errorHandler } from "@/app/api/__handlers";

export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
	try {
		const { chapterId } = await params;
		const { isCompleted } = (await request.json()) as {
			isCompleted: boolean;
		};
		const userId = await authHandler();

		const userProgress = await prisma.userProgress.upsert({
			where: {
				userId_chapterId: {
					userId,
					chapterId
				}
			},
			update: {
				isCompleted
			},
			create: {
				userId,
				chapterId,
				isCompleted
			}
		});

		return NextResponse.json(userProgress);
	} catch (error) {
		errorHandler({
			error,
			route: "PUT /api/courses/[courseId]/chapters/[chapterId]/progress"
		});
	}
}
