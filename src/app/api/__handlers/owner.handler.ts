import { NextResponse } from "next/server";

import { prisma } from "@/shared/database";

export const ownerHandler = async (courseId: string, userId: string) => {
	const owner = await prisma.course.findUnique({
		where: { id: courseId }
	});

	if (owner?.userId !== userId) {
		throw new NextResponse("Unauthorized", { status: 401 });
	}
};
