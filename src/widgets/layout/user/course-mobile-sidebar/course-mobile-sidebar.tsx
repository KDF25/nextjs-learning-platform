import { Menu } from "lucide-react";
import { FC } from "react";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger
} from "@/shared/ui";

import { GetUserCourses } from "@/entities/course";

import { CourseSidebar } from "../course-sidebar";

interface ICourseMobileSidebarProps {
	userId: string;
	course: GetUserCourses;
	progressCount: number;
}

export const CourseMobileSidebar: FC<ICourseMobileSidebarProps> = ({
	userId,
	course,
	progressCount
}) => {
	return (
		<Sheet>
			<SheetTrigger className="md:hidden pr-4 hover:opacity-80 transition-opacity">
				<Menu />
			</SheetTrigger>
			<SheetContent side="left" className="p-0 bg-white w-72">
				<SheetTitle className="sr-only">Course Sidebar</SheetTitle>
				<SheetDescription className="sr-only" />
				<CourseSidebar
					userId={userId}
					course={course}
					progressCount={progressCount}
				/>
			</SheetContent>
		</Sheet>
	);
};
