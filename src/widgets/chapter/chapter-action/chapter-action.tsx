"use client";

import { FC, useState } from "react";

import { ChangePublish, DeleteChapter } from "@/features/chapter";

interface IChapterActionProps {
	courseId: string;
	chapterId: string;
	isPublished: boolean;
}

export const ChapterAction: FC<IChapterActionProps> = ({
	courseId,
	chapterId,
	isPublished
}) => {
	const [isUpdating, setIsUpdating] = useState<boolean>(false);

	return (
		<div className="flex items-center gap-x-2">
			<ChangePublish
				disabled={isUpdating}
				isPublished={isPublished}
				courseId={courseId}
				chapterId={chapterId}
				onClickButton={setIsUpdating}
			/>
			<DeleteChapter
				disabled={isUpdating}
				courseId={courseId}
				chapterId={chapterId}
				onClickButton={setIsUpdating}
			/>
		</div>
	);
};
