import { Chapter, Course } from "@prisma/client";

export const getCourseFields = ({
	course
}: {
	course: Course & { chapters: Chapter[] };
}) => {
	const required = [
		course?.title,
		course?.description,
		course?.imageUrl,
		course?.price,
		course?.categoryId,
		course?.chapters?.some((chapter) => chapter?.isPublished)
	];

	const total = required.length;
	const completed = required.filter(Boolean).length;

	const isComplete = total === completed;

	return {
		total,
		completed,
		isComplete
	};
};
