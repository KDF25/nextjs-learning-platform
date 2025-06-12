import { NextResponse } from "next/server";

import { prisma } from "@/shared/database";

import { ICourseTitleForm } from "@/entities/course";

import { authHandler, errorHandler } from "../__handler";

export async function POST(request: Request) {
	try {
		const userId = await authHandler();
		const { title } = (await request.json()) as ICourseTitleForm;
		const course = await prisma.course.create({
			data: {
				title,
				userId
			}
		});
		return NextResponse.json(course);
	} catch (error) {
		errorHandler({ error, route: "POST /api/courses" });
	}
}
