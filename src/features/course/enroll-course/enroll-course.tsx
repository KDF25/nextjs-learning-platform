"use client";

import { FC } from "react";

import { formatPrice } from "@/shared/lib";
import { Button } from "@/shared/ui";

interface IEnrollCourseProps {
	price: number;
	courseId: string;
}

export const EnrollCourse: FC<IEnrollCourseProps> = ({
	price
	// courseId
}) => {
	return (
		<Button className="w-full md:w-auto">
			Enroll for {formatPrice(price)}
		</Button>
	);
};
