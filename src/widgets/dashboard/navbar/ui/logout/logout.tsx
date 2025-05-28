"use client";

import { LogOut } from "lucide-react";
import { FC } from "react";

import { Button } from "@/shared/ui";

export const Logout: FC = ({}) => {
	return (
		<Button size={"sm"} variant={"ghost"}>
			<LogOut className="h-4 w-4 mr-2" />
			Exit
		</Button>
	);
};
