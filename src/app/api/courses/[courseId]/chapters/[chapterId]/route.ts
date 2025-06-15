import { NextResponse } from "next/server";

import { prisma } from "@/shared/database";

import { authHandler, errorHandler, ownerHandler } from "@/app/api/__handler";

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ courseId: string; attachmentId: string }> }
) {
	try {
		const { courseId, attachmentId } = await params;
		const userId = await authHandler();
		await ownerHandler(courseId, userId);

		const attachment = await prisma.attachment.delete({
			where: {
				id: attachmentId
			}
		});

		return NextResponse.json(attachment);
	} catch (error) {
		errorHandler({
			error,
			route: "DELETE /api/courses/[courseId]/chapters/[chapterId]"
		});
	}
}
