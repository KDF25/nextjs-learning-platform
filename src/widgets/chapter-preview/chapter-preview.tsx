import { Attachment, Chapter, Course, MuxData, Purchase } from "@prisma/client";
import { FC } from "react";

import { EditorPreview, Separator } from "@/shared/ui";

import { ChangeProgressCourse, EnrollCourse } from "@/features/course";

import { AttachmentSection, VideoPlayer } from "./ui";

interface IChapterPreviewProps {
	chapterId: string;
	courseId: string;
	isLocked: boolean;
	completeOnEnd: boolean;
	muxData?: MuxData | null;
	chapter?: Chapter | null;
	course?: Pick<Course, "price"> | null;
	purchase?: Purchase | null;
	attachments: Attachment[];
	nextChapter?: Chapter | null;
	isCompleted?: boolean;
}

export const ChapterPreview: FC<IChapterPreviewProps> = ({
	chapterId,
	courseId,
	isLocked,
	completeOnEnd,
	muxData,
	chapter,
	course,
	purchase,
	attachments,
	nextChapter,
	isCompleted
}) => {
	return (
		<div className="flex flex-col max-w-4xl mx-auto ">
			<div className="p-4">
				<VideoPlayer
					title={chapter?.title || "Chapter"}
					chapterId={chapterId}
					courseId={courseId}
					isLocked={isLocked}
					completeOnEnd={completeOnEnd}
					playbackId={muxData?.playbackId}
					nextChapterId={nextChapter?.id}
				/>
			</div>
			<div>
				<div className="p-4 flex flex-col md:flex-row items-center justify-between gap-2">
					<h2 className="text-2xl font-semibold">{chapter?.title}</h2>
					{!!purchase ? (
						<ChangeProgressCourse
							chapterId={chapterId}
							courseId={courseId}
							nextChapterId={nextChapter?.id || ""}
							isCompleted={isCompleted || false}
						/>
					) : (
						<EnrollCourse
							price={course?.price || 0}
							courseId={courseId}
						/>
					)}
				</div>
				<Separator />
				<div>
					<EditorPreview value={chapter?.description || ""} />
				</div>
				{!!attachments.length && (
					<>
						<Separator />
						<AttachmentSection attachments={attachments} />
					</>
				)}
			</div>
		</div>
	);
};
