"use client";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";
import { Button } from "@/shared/ui";

export const NewCourse: FC = ({}) => {
	return (
		<Link href={ENUM_PATH.TEACHER.CREATE}>
			<Button>
				<PlusCircle size={2} className="mr-2" />
				New Course
			</Button>
		</Link>
	);
};
