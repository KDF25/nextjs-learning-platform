import { auth } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";

import { ChapterService, getChapterFields } from "@/entities/chapter";

import { ChapterAccess } from "@/widgets/chapter-access";
import { ChapterCustomize } from "@/widgets/chapter-customize";

interface IChapterIdPageProps {
	courseId: string;
	chapterId: string;
}

export const ChapterIdPage: FC<IChapterIdPageProps> = async ({
	courseId,
	chapterId
}) => {
	const { userId } = await auth();

	if (!userId) {
		redirect(ENUM_PATH.MAIN);
	}

	const chapter = await ChapterService.getById(chapterId, courseId);

	if (!chapter) {
		redirect(ENUM_PATH.MAIN);
	}

	const { total, completed } = getChapterFields({ chapter });

	return (
		<div className="p-6 flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-2">
					<Link
						href={`/teacher/courses/${courseId}`}
						className="flex items-center  hover:opacity-75 transition gap-x-2"
					>
						<ArrowLeft size={16} />
						<p className="text-sm">Back to course setup</p>
					</Link>
					{/* <CustomBack
						title="Back to course setup"
						path={`teacher/courses/${courseId}`}
					/> */}
					<h1 className="text-2xl font-medium">Chapter creation</h1>
					<span className="text-sm text-slate-700">
						Complete all fields {completed}/{total}
					</span>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
				<div className="flex flex-col gap-6">
					<ChapterCustomize chapter={chapter} courseId={courseId} />
					<ChapterAccess chapter={chapter} courseId={courseId} />
				</div>
			</div>
		</div>
	);
};
