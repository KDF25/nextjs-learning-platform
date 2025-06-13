import { NextResponse } from "next/server";

import { prisma } from "@/shared/database";

import { authHandler, errorHandler } from "@/app/api/__handler";

export async function POST(
	req: Request,
	{ params }: { params: Promise<{ courseId: string }> }
) {
	try {
		const userId = await authHandler();
		const { courseId } = await params;
		const { url, name } = await req.json();

		const owner = await prisma.course.findUnique({
			where: { id: courseId }
		});

		if (owner?.userId !== userId) {
			throw new NextResponse("Unauthorized", { status: 401 });
		}

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
