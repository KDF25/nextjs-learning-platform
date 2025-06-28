"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";
import { Button } from "@/shared/ui";

export const Logout: FC = ({}) => {
	return (
		<Link href={ENUM_PATH.MAIN}>
			<Button size={"sm"} variant={"ghost"}>
				<LogOut className="h-4 w-4 mr-2" />
				Exit
			</Button>
		</Link>
	);
};
