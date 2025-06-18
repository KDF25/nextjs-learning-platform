"use client";

import { Chapter } from "@prisma/client";
import { ServerCogIcon } from "lucide-react";
import { FC } from "react";

import { CustomIcon } from "@/shared/ui";

import { DescriptionSection, TitleSection } from "./ui";

interface IChapterCustomizeFormProps {
	chapter: Chapter;
	courseId: string;
}

export const ChapterCustomize: FC<IChapterCustomizeFormProps> = ({
	chapter,
	courseId
}) => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-x-2">
				<CustomIcon icon={ServerCogIcon} />
				<h2 className="text-xl font-semibold">
					Customize your chapter
				</h2>
			</div>

			<TitleSection initialData={chapter} courseId={courseId} />
			<DescriptionSection initialData={chapter} courseId={courseId} />
			{/* <ImageSection initialData={chapter} /> */}
			{/* <CategorySection
				initialData={course}
				categories={categories.map((c) => ({
					label: c.name,
					value: c.id
				}))}
			/> */}
		</div>
	);
};
