import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";
import { CustomBackground } from "@/shared/ui";

import { CourseService } from "@/entities/course";

import { CourseNavbar, CourseSidebar } from "@/widgets/layout";

interface ICourseLayoutProps {
	children: React.ReactNode;
	params: Promise<{ courseId: string }>;
}

const CourseLayout: FC<ICourseLayoutProps> = async ({ children, params }) => {
	const { userId } = await auth();
	const { courseId } = await params;

	if (!userId) {
		redirect(ENUM_PATH.MAIN);
	}

	const course = await CourseService.getUserCourseById(
		userId || "",
		courseId
	);

	if (!course) {
		redirect(ENUM_PATH.MAIN);
	}

	const progressCount = await CourseService.getProgress(userId, course.id);

	return (
		<div className="h-full relative">
			<CustomBackground />
			<div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
				<CourseNavbar
					userId={userId}
					course={course}
					progressCount={progressCount}
				/>
			</div>
			<div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50 ">
				<CourseSidebar
					userId={userId}
					course={course}
					progressCount={progressCount}
				/>
			</div>
			<main className="md:pl-80 h-full pt-[80px]">{children}</main>
		</div>
	);
};

export default CourseLayout;
