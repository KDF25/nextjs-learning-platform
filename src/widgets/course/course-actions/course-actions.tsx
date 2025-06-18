"use client";

import { FC, useState } from "react";

import { ChangePublish, DeleteChapter } from "@/features/course";

interface ICourseActionsProps {
	courseId: string;
	isPublished: boolean;
	isComplete?: boolean;
}

export const CourseActions: FC<ICourseActionsProps> = ({
	courseId,
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
				onClickButton={setIsUpdating}
				isComplete={isComplete}
			/>
			<DeleteChapter
				disabled={isUpdating}
				courseId={courseId}
				onClickButton={setIsUpdating}
			/>
		</div>
	);
};
