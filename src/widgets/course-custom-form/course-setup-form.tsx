"use client";

import { Course } from "@prisma/client";
import { ServerCogIcon } from "lucide-react";
import { FC } from "react";

import { CustomIcon } from "@/shared/ui";

import { DescriptionSection, ImageSection, TitleSection } from "./ui";

interface ICourseCustomFormProps {
	course: Course;
}

export const CourseCustomForm: FC<ICourseCustomFormProps> = ({ course }) => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-x-2">
				<CustomIcon icon={ServerCogIcon} />
				<h2 className="text-xl">Customize your course</h2>
			</div>

			<TitleSection initialData={course} />
			<DescriptionSection initialData={course} />
			<ImageSection initialData={course} />
		</div>
	);
};
