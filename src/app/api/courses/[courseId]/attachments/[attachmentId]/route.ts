import { NextResponse } from "next/server";

import { prisma } from "@/shared/database";

import { authHandler, errorHandler } from "@/app/api/__handler";

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ courseId: string; attachmentId: string }> }
) {
	try {
		const userId = await authHandler();
		const { courseId, attachmentId } = await params;

		const owner = await prisma.course.findUnique({
			where: { id: courseId }
		});

		if (owner?.userId !== userId) {
			throw new NextResponse("Unauthorized", { status: 401 });
		}

		const attachment = await prisma.attachment.delete({
			where: {
				id: attachmentId
			}
		});
		return NextResponse.json(attachment);
	} catch (error) {
		errorHandler({
			error,
			route: "DELETE /api/courses/[courseId]/attachments/[attachmentId]"
		});
	}
}
