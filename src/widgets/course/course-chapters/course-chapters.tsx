"use client";

import { Chapter, Course } from "@prisma/client";
import { LayoutList } from "lucide-react";
import { FC } from "react";

import { CustomIcon } from "@/shared/ui";

import { ChapterSection } from "./ui";

interface ICourseChaptersFormProps {
	course: Course & { chapters: Chapter[] };
}

export const CourseChapters: FC<ICourseChaptersFormProps> = ({ course }) => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-x-2">
				<CustomIcon icon={LayoutList} />
				<h2 className="text-xl font-semibold">Course chapters</h2>
			</div>
			<ChapterSection initialData={course} />
		</div>
	);
};
