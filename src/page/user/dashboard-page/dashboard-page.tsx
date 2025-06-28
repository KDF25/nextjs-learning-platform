import { auth } from "@clerk/nextjs/server";
import { CheckCircle, Clock } from "lucide-react";
import { FC } from "react";

import { InfoCard } from "@/shared/ui";

import { CourseService } from "@/entities/course";

import { CoursesList } from "@/widgets/courses-list";

export const DashboardPage: FC = async ({}) => {
	const { userId } = await auth();

	const { completed, inProgress } = await CourseService.getUserDashboard(
		userId!
	);

	return (
		<div className="p-6 space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<InfoCard
					icon={Clock}
					label="In progress"
					count={inProgress.length}
				/>
				<InfoCard
					icon={CheckCircle}
					label="Completed"
					count={completed.length}
					variant={"success"}
				/>
			</div>
			<CoursesList courses={[...inProgress, ...completed]} />
		</div>
	);
};
