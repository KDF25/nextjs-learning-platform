import { FC } from "react";

interface ChapterIdsPageProps {
	params: Promise<{ chapterId: string }>;
}

const ChapterIdsPage: FC<ChapterIdsPageProps> = async ({ params }) => {
	const {} = await params;
	return <div>ChapterIdsPage</div>;
};

export default ChapterIdsPage;
