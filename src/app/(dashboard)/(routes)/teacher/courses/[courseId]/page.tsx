import { FC } from "react";

import { CourseIdPage } from "@/page/course-id-page";

interface CourseIdsPageProps {
	params: Promise<{ courseId: string }>;
}

const CourseIdsPage: FC<CourseIdsPageProps> = async ({ params }) => {
	const { courseId } = await params;
	return <CourseIdPage courseId={courseId} />;
};

export default CourseIdsPage;
