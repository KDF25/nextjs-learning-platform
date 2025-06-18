"use client";

import { FC, useState } from "react";

import { ChangePublish, DeleteChapter } from "@/features/chapter";

interface IChapterActionsProps {
	courseId: string;
	chapterId: string;
	isPublished: boolean;
	isComplete?: boolean;
}

export const ChapterActions: FC<IChapterActionsProps> = ({
	courseId,
	chapterId,
	isPublished,
	isComplete
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
				isComplete={isComplete}
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
