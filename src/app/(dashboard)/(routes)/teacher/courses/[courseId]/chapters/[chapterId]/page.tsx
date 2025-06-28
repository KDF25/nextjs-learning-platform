import { FC } from "react";

import { ChapterIdPage } from "@/page/teacher";

interface ChapterIdsPageProps {
	params: Promise<{ courseId: string; chapterId: string }>;
}

const ChapterIdsPage: FC<ChapterIdsPageProps> = async ({ params }) => {
	const { courseId, chapterId } = await params;
	return <ChapterIdPage courseId={courseId} chapterId={chapterId} />;
};

export default ChapterIdsPage;
