import { NextResponse } from "next/server";

import { prisma } from "@/shared/database";

import { IAddAttachment } from "@/entities/attachment";

import { authHandler, errorHandler, ownerHandler } from "@/app/api/__handler";

export async function POST(
	req: Request,
	{ params }: { params: Promise<{ courseId: string }> }
) {
	try {
		const { courseId } = await params;
		const userId = await authHandler();
		await ownerHandler(courseId, userId);

		const { url, name } = (await req.json()) as IAddAttachment;

		const attachment = await prisma.attachment.create({
			data: {
				url,
				name,
				courseId
			}
		});

		return NextResponse.json(attachment);
	} catch (error) {
		errorHandler({
			error,
			route: "POST /api/courses/[courseId]/attachments"
		});
	}
}
