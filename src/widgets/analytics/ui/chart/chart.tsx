"use client";

import { FC } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card } from "@/shared/ui";

import { IChart } from "@/entities/course";

interface IChartProps {
	data: IChart[];
}

export const Chart: FC<IChartProps> = ({ data }) => {
	return (
		<Card>
			<ResponsiveContainer width="100%" height={350}>
				<BarChart data={data}>
					<XAxis
						dataKey={"name"}
						stroke="#888888"
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
