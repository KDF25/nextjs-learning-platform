import { NextResponse } from "next/server";

import { prisma } from "@/shared/database";

import { authHandler, errorHandler, ownerHandler } from "@/app/api/__handlers";

export async function PATCH(
	req: Request,
	{ params }: { params: Promise<{ courseId: string }> }
) {
	try {
		const { courseId } = await params;
		const userId = await authHandler();
		await ownerHandler(courseId, userId);

		const unpublishCourse = await prisma.course.update({
			where: {
				id: courseId,
				userId
			},
			data: {
				isPublished: false
			}
		});

		return NextResponse.json(unpublishCourse);
	} catch (error) {
		errorHandler({
			error,
			route: "PATCH /api/courses/[courseId]/unpublish"
		});
	}
}
