"use client";

import { Course } from "@prisma/client";
import { LayoutList } from "lucide-react";
import { FC } from "react";

import { CustomIcon } from "@/shared/ui";

interface ICourseChaptersFormProps {
	course: Course;
}

export const CourseChapters: FC<ICourseChaptersFormProps> = ({}) => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-x-2">
				<CustomIcon icon={LayoutList} />
				<h2 className="text-xl font-semibold">Course chapters</h2>
			</div>
		</div>
	);
};
