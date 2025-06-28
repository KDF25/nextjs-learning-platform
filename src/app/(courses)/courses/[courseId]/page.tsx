import { FC } from "react";

import { CourseIdPage } from "@/page/user";

interface CourseIdsPageProps {
	params: Promise<{ courseId: string }>;
}

const CourseId: FC<CourseIdsPageProps> = async ({ params }) => {
	const { courseId } = await params;
	return <CourseIdPage courseId={courseId} />;
};

export default CourseId;
