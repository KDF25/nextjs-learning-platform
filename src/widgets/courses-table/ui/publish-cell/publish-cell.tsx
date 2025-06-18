"use client";

import { FC } from "react";

import { cn } from "@/shared/lib";
import { Badge } from "@/shared/ui";

interface IPublishCellProps {
	isPublished: boolean;
}

export const PublishCell: FC<IPublishCellProps> = ({ isPublished }) => {
	return (
		<Badge
			className={cn(
				"bg-slate-500 cursor-pointer",
				isPublished && "bg-sky-700"
			)}
		>
			{isPublished ? "Published" : "Draft"}
		</Badge>
	);
};
