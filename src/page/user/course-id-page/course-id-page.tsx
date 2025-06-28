import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";

import { CourseService } from "@/entities/course";

interface ICourseIdPageProps {
	courseId: string;
}

export const CourseIdPage: FC<ICourseIdPageProps> = async ({ courseId }) => {
	const { userId } = await auth();
	const course = await CourseService.getUserCourseById(
		userId || "",
		courseId
	);

	if (!course) {
		redirect(ENUM_PATH.MAIN);
	}

	return redirect(
		ENUM_PATH.COURSES.CHAPTER(course.id, course.chapters[0]?.id)
	);
};
