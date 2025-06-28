import { FC } from "react";

import { ChapterIdPage } from "@/page/user";

interface IChapterIdProps {
	params: Promise<{ courseId: string; chapterId: string }>;
}

const ChapterId: FC<IChapterIdProps> = async ({ params }) => {
	const { courseId, chapterId } = await params;
	return <ChapterIdPage courseId={courseId} chapterId={chapterId} />;
};

export default ChapterId;
