import { NextResponse } from "next/server";

import { prisma } from "@/shared/database";

import { getCourseFields } from "@/entities/course";

import { authHandler, errorHandler, ownerHandler } from "@/app/api/__handlers";

export async function PATCH(
	req: Request,
	{ params }: { params: Promise<{ courseId: string }> }
) {
	try {
		const { courseId } = await params;
		const userId = await authHandler();
		await ownerHandler(courseId, userId);

		const course = await prisma.course.findUnique({
			where: {
				id: courseId,
				userId
			},
			include: {
				chapters: {
					include: {
						muxData: true
					}
				}
			}
		});

		if (!course) {
			return NextResponse.json(
				{
					message: "Course not found"
				},
				{ status: 404 }
			);
		}

		const { isComplete } = getCourseFields({ course });

		if (!isComplete) {
			return NextResponse.json(
				{
					message: "Missing required fields"
				},
				{ status: 400 }
			);
		}

		const publishedCourse = await prisma.course.update({
			where: {
				id: courseId,
				userId
			},
			data: {
				isPublished: true
			}
		});

		return NextResponse.json(publishedCourse);
	} catch (error) {
		errorHandler({
			error,
			route: "PATCH /api/courses/[courseId]/publish"
		});
	}
}
