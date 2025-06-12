"use client";

import Link from "next/link";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";
import { Button } from "@/shared/ui";

const CoursesPage: FC = () => {
	return (
		<div className="p-6">
			<Link href={ENUM_PATH.TEACHER_NEW_COURSE}>
				<Button>New Course</Button>
			</Link>
		</div>
	);
};

export default CoursesPage;
