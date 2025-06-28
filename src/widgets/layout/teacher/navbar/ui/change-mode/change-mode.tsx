"use client";

import Link from "next/link";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";
import { Button } from "@/shared/ui";

export const ChangeMode: FC = ({}) => {
	return (
		<Link href={ENUM_PATH.TEACHER.COURSES}>
			<Button size={"sm"} variant={"ghost"}>
				Teacher mode
			</Button>
		</Link>
	);
};
