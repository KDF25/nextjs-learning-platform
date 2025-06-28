import { auth } from "@clerk/nextjs/server";
import { FC } from "react";

import { Banner } from "@/shared/ui";

import { ChapterService } from "@/entities/chapter";

import { ChapterPreview } from "@/widgets/chapter-preview";

interface IChapterIdPageProps {
	courseId: string;
	chapterId: string;
}

export const ChapterIdPage: FC<IChapterIdPageProps> = async ({
	courseId,
	chapterId
}) => {
	const { userId } = await auth();
	const {
		chapter,
		course,
		muxData,
		userProgress,
		purchase,
		attachments,
		nextChapter
	} = await ChapterService.getUserChapterById(
		userId || "",
		chapterId,
		courseId
	);

	const isLocked = !chapter?.isFree && !purchase;
	const competeOnEnd = !!purchase && !userProgress?.isCompleted;

	return (
		<div>
			{userProgress?.isCompleted && (
				<Banner
					variant="success"
					label="You have completed the chapter"
				/>
			)}

			{!chapter?.isPublished && (
				<Banner
					variant="warning"
					label="You need to purchase the course to access this chapter"
				/>
			)}

			<ChapterPreview
				chapterId={chapterId}
				courseId={courseId}
				isLocked={isLocked}
				completeOnEnd={competeOnEnd}
				muxData={muxData}
				chapter={chapter}
				course={course}
				attachments={attachments}
				purchase={purchase}
				nextChapter={nextChapter}
				isCompleted={!!userProgress?.isCompleted}
			/>
		</div>
	);
};
