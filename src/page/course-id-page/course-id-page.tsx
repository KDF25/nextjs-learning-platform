import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";

import { CategoryService } from "@/entities/category";
import { CourseService, getCourseFields } from "@/entities/course";

import { CourseAttachment } from "@/widgets/course/course-attachment";
import { CourseChapters } from "@/widgets/course/course-chapters";
import { CourseCustomize } from "@/widgets/course/course-customize";
import { CoursePrice } from "@/widgets/course/course-price";

interface ICourseIdPageProps {
	courseId: string;
}

export const CourseIdPage: FC<ICourseIdPageProps> = async ({ courseId }) => {
	const { userId } = await auth();

	if (!userId) {
		redirect(ENUM_PATH.MAIN);
	}

	const course = await CourseService.getById(userId, courseId);

	if (!course) {
		redirect(ENUM_PATH.MAIN);
	}

	const { total, completed } = getCourseFields({ course });
	const categories = await CategoryService.getCategories();

	return (
		<div className="p-6 flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-medium">Course setup</h1>
					<span className="text-sm text-slate-700">
						Complete all fields {completed}/{total}
					</span>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
				<CourseCustomize course={course} categories={categories} />
				<div className="flex flex-col gap-6">
					<CourseChapters course={course} />
					<CoursePrice course={course} />
					<CourseAttachment course={course} />
				</div>
			</div>
		</div>
	);
};
