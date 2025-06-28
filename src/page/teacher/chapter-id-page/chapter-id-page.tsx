import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";
import { Banner, CustomBack } from "@/shared/ui";

import { ChapterService, getChapterFields } from "@/entities/chapter";

import {
	ChapterAccess,
	ChapterActions,
	ChapterCustomize,
	ChapterVideo
} from "@/widgets/chapter";

interface IChapterIdPageProps {
	courseId: string;
	chapterId: string;
}

export const ChapterIdPage: FC<IChapterIdPageProps> = async ({
	courseId,
	chapterId
}) => {
	const { userId } = await auth();

	const chapter = await ChapterService.getTeacherChapterById(
		userId || "",
		courseId,
		chapterId
	);

	if (!chapter) {
		redirect(ENUM_PATH.MAIN);
	}

	const { total, completed, isComplete } = getChapterFields({ chapter });

	return (
		<>
			{!chapter?.isPublished && (
				<div>
					<Banner
						variant="warning"
						label="Chapter is not published. It will not be visible in the course"
					/>
				</div>
			)}
			<div className="p-6 flex flex-col gap-6">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-2">
						<CustomBack
							title="Back to course setup"
							path={ENUM_PATH.TEACHER.COURSE(courseId)}
						/>
						<h1 className="text-2xl font-medium">
							Chapter creation
						</h1>
						<span className="text-sm text-slate-700">
							Complete all fields {completed}/{total}
						</span>
					</div>
					<ChapterActions
						courseId={courseId}
						chapterId={chapterId}
						isPublished={chapter?.isPublished}
						isComplete={isComplete}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
					<div className="flex flex-col gap-6">
						<ChapterCustomize
							chapter={chapter}
							courseId={courseId}
						/>
						<ChapterAccess chapter={chapter} courseId={courseId} />
					</div>
					<ChapterVideo chapter={chapter} courseId={courseId} />
				</div>
			</div>
		</>
	);
};
