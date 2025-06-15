"use client";

import { Chapter } from "@prisma/client";
import { Eye } from "lucide-react";
import { FC } from "react";

import { CustomIcon } from "@/shared/ui";

import { AccessSection } from "./ui";

interface IChapterAccessFormProps {
	chapter: Chapter;
	courseId: string;
}

export const ChapterAccess: FC<IChapterAccessFormProps> = ({
	chapter,
	courseId
}) => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-x-2">
				<CustomIcon icon={Eye} />
				<h2 className="text-xl font-semibold">Access & Permissions</h2>
			</div>

			<AccessSection initialData={chapter} courseId={courseId} />
		</div>
	);
};
