import { NextResponse } from "next/server";

import { prisma } from "@/shared/database";

import { ICharperPosition } from "@/entities/chapter";

import { authHandler, errorHandler, ownerHandler } from "@/app/api/__handler";

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ courseId: string }> }
) {
	try {
		const { courseId } = await params;
		const userId = await authHandler();
		await ownerHandler(courseId, userId);

		const newData = (await req.json()) as ICharperPosition[];

		for (const data of newData) {
			await prisma.chapter.update({
				where: {
					id: data.id
				},
				data: {
					position: data.position
				}
			});
		}

		return new NextResponse("Success", { status: 200 });
	} catch (error) {
		errorHandler({
			error,
			route: "PUT /api/courses/[courseId]/chapters/reorder"
		});
	}
}
