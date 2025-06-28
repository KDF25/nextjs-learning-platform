import { FC } from "react";

import { NavbarRoutes } from "@/shared/ui";

import { GetUserCourses } from "@/entities/course";

import { CourseMobileSidebar } from "../course-mobile-sidebar";

interface ICourseNavbarProps {
	userId: string;
	course: GetUserCourses;
	progressCount: number;
}

export const CourseNavbar: FC<ICourseNavbarProps> = ({
	userId,
	course,
	progressCount
}) => {
	return (
		<div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
			<CourseMobileSidebar
				userId={userId}
				course={course}
				progressCount={progressCount}
			/>
			<NavbarRoutes />
		</div>
	);
};
