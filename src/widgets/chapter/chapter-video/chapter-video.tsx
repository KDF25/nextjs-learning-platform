"use client";

import { Chapter } from "@prisma/client";
import { Video } from "lucide-react";
import { FC } from "react";

import { CustomIcon } from "@/shared/ui";

import { VideoSection } from "./ui";

interface IChapterVideoFormProps {
	chapter: Chapter;
	courseId: string;
}

export const ChapterVideo: FC<IChapterVideoFormProps> = ({
	chapter,
	courseId
}) => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-x-2">
				<CustomIcon icon={Video} />
				<h2 className="text-xl font-semibold">Add a video</h2>
			</div>

			<VideoSection initialData={chapter} courseId={courseId} />
		</div>
	);
};
