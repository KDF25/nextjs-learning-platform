import { Course } from "@prisma/client";
import { NextResponse } from "next/server";

import { MUX_DATA } from "@/shared/config";
import { prisma } from "@/shared/database";

import { authHandler, errorHandler } from "../../__handlers";

const { video } = MUX_DATA;

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

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ courseId: string }> }
) {
	try {
		const userId = await authHandler();
		const { courseId } = await params;

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

		for (const chapter of course.chapters) {
			if (chapter?.muxData?.assetId) {
				await video.assets.delete(chapter?.muxData?.assetId);
			}
		}

		const deletedCourse = await prisma.course.delete({
			where: {
				id: courseId
			}
		});

		return NextResponse.json(deletedCourse);
	} catch (error) {
		errorHandler({ error, route: "DELETE /api/courses/[courseId]" });
	}
}
