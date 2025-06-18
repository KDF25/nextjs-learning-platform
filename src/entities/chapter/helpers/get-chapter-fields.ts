import { Chapter } from "@prisma/client";

export const getChapterFields = ({ chapter }: { chapter: Chapter }) => {
	const required = [chapter?.title, chapter?.description, chapter?.videoUrl];

	const total = required.length;
	const completed = required.filter(Boolean).length;

	const isComplete = total === completed;

	return {
		total,
		completed,
		isComplete
	};
};
