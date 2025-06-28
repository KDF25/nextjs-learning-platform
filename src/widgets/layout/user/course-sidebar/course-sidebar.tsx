import { FC } from "react";

import { CustomProgress } from "@/shared/ui";

import { GetUserCourses } from "@/entities/course";
import { PurchaseService } from "@/entities/purchase";

import { CourseSidebarItem } from "./ui";

interface ICourseSidebarProps {
	userId: string;
	course: GetUserCourses;
	progressCount: number;
}

export const CourseSidebar: FC<ICourseSidebarProps> = async ({
	userId,
	course,
	progressCount
}) => {
	const purchase = await PurchaseService.getPurchases(userId, course.id);

	return (
		<div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
			<div className="flex flex-col border-b p-8 gap-10">
				<h1 className="font-semibold">{course?.title}</h1>
				{!purchase && (
					<CustomProgress
						variant="success"
						progress={progressCount}
					/>
				)}
			</div>
			<div className="flex flex-col w-full">
				{course?.chapters?.map((chapter) => (
					<CourseSidebarItem key={chapter.id} item={chapter} />
				))}
			</div>
		</div>
	);
};
