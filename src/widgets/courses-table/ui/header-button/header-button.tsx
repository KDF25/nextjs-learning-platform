"use client";

import { ArrowUpDown } from "lucide-react";
import { FC } from "react";

import { Button } from "@/shared/ui";

interface HeaderButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
}

export const HeaderButton: FC<HeaderButtonProps> = ({ title, ...props }) => {
	return (
		<Button variant="ghost" {...props}>
			{title}
			<ArrowUpDown className="ml-2 h-4 w-4" />
		</Button>
	);
};
