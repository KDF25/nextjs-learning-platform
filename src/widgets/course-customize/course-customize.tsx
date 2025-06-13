"use client";

import { Category, Course } from "@prisma/client";
import { ServerCogIcon } from "lucide-react";
import { FC } from "react";

import { CustomIcon } from "@/shared/ui";

import {
	CategorySection,
	DescriptionSection,
	ImageSection,
	TitleSection
} from "./ui";

interface ICourseCustomizeFormProps {
	course: Course;
	categories: Category[];
}

export const CourseCustomize: FC<ICourseCustomizeFormProps> = ({
	course,
	categories
}) => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-x-2">
				<CustomIcon icon={ServerCogIcon} />
				<h2 className="text-xl font-semibold">Customize your course</h2>
			</div>

			<TitleSection initialData={course} />
			<DescriptionSection initialData={course} />
			<ImageSection initialData={course} />
			<CategorySection
				initialData={course}
				categories={categories.map((c) => ({
					label: c.name,
					value: c.id
				}))}
			/>
		</div>
	);
};
