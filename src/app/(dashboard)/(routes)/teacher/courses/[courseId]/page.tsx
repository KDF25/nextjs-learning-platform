import { FC } from "react";

import { CourseSetupPage } from "@/page/course-setup";

interface CourseIdsPageProps {
	params: Promise<{ courseId: string }>;
}

const CourseIdsPage: FC<CourseIdsPageProps> = async ({ params }) => {
	const { courseId } = await params;
	return <CourseSetupPage courseId={courseId} />;
};

export default CourseIdsPage;
