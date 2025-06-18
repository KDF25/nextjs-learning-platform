import { Course } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/shared/database";

import { authHandler, errorHandler } from "../../__handlers";

export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ courseId: string }> }
) {
	try {
		const userId = await authHandler();
		const { courseId } = await params;
		const values = (await request.json()) as Course;
		const course = await prisma.course.update({
			where: {
				id: courseId,
				userId
			},
			data: {
				...values
			}
		});
		return NextResponse.json(course);
	} catch (error) {
		errorHandler({ error, route: "PATCH /api/courses/[courseId]" });
	}
}
