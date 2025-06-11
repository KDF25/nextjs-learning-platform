import { Course } from "@prisma/client";

export const getCourseFields = ({ course }: { course: Course }) => {
	const required = [
		course?.title,
		course?.description,
		course?.imageUrl,
		course?.price,
		course?.categoryId
	];

	const total = required.length;
	const completed = required.filter(Boolean).length;

	return {
		total,
		completed
	};
};
