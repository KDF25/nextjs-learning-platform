import { FC } from "react";

import { CustomIcon, ICustomIconProps } from "../custom-icon";

interface IInfoCardProps extends ICustomIconProps {
	label: string;
	count: number;
}

export const InfoCard: FC<IInfoCardProps> = ({ label, count, ...props }) => {
	return (
		<div className="border rounded-md flex items-center gap-x-2 p-3 bg-background/70">
			<CustomIcon {...props} />
			<div className="flex flex-col gap-2">
				<p className="font-medium">{label}</p>
				<p className="text-sm text-gray-500">
					{count} {count > 1 ? "items" : "item"}
				</p>
			</div>
		</div>
	);
};
