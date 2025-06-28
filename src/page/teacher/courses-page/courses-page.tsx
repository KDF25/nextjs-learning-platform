import { auth } from "@clerk/nextjs/server";
import { FC } from "react";

import { CourseService } from "@/entities/course";

import { CoursesTable } from "@/widgets/courses-table";

export const CoursesPage: FC = async () => {
	const { userId } = await auth();
	const data = await CourseService.getAll(userId!);

	return (
		<div className="p-6 flex flex-col gap-6">
			<CoursesTable courses={data} />
		</div>
	);
};
