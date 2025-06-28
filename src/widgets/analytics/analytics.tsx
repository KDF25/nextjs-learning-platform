import { auth } from "@clerk/nextjs/server";
import { FC } from "react";

import { CourseService } from "@/entities/course";

import { Chart, DataCard } from "./ui";

interface IAnalyticsProps {}

export const Analytics: FC<IAnalyticsProps> = async ({}) => {
	const { userId } = await auth();

	const { totalRevenue, totalSales, data } =
		await CourseService.getTeacherAnalytics(userId || "");

	return (
		<div className="p-6 flex flex-col gap-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  gap-4">
				<DataCard
					label="Total Revenue"
					value={totalRevenue}
					shouldFormat
				/>
				<DataCard label="Total Sales" value={totalSales} />
			</div>
			<Chart data={data} />
		</div>
	);
};
