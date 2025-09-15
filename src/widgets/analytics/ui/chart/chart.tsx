"use client";

import { FC } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card } from "@/shared/ui";

import { IChart } from "@/entities/course";

interface IChartProps {
	data: IChart[];
}

export const Chart: FC<IChartProps> = ({ data }) => {
	const formData = data.map((item) => ({
		name: item.name.slice(0, 10),
		total: item.total
	}));
	return (
		<Card>
			<ResponsiveContainer width="100%" height={350}>
				<BarChart data={formData}>
					<XAxis
						dataKey={"name"}
						stroke="#000"
						fontSize={12}
						tickLine={false}
						axisLine={false}
					/>
					<YAxis
						stroke="#888888"
						fontSize={12}
						tickLine={false}
						axisLine={false}
						tickFormatter={(value) => `$${value}`}
					/>
					<Bar
						dataKey={"total"}
						fill="#0369a1"
						radius={[4, 4, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Card>
	);
};
