import { FC } from "react";

interface ICourseIdPageProps {
	courseId: string;
}

export const CourseIdPage: FC<ICourseIdPageProps> = ({ courseId }) => {
	return (
		<div>
			<p>CourseIdPage {courseId}</p>
		</div>
	);
};
