import { FC } from "react";

import { formatPrice } from "@/shared/lib";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

interface IDataCardProps {
	value?: number;
	label: string;
	shouldFormat?: boolean;
}

export const DataCard: FC<IDataCardProps> = ({
	value,
	label,
	shouldFormat
}) => {
	return (
		<Card className="flex flex-col gap-2">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 ">
				<CardTitle className="text-sm font-medium">{label}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">
					{shouldFormat ? formatPrice(value || 0) : value || 0}
				</div>
			</CardContent>
		</Card>
	);
};
