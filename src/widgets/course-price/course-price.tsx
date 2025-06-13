"use client";

import { Course } from "@prisma/client";
import { CircleDollarSign } from "lucide-react";
import { FC } from "react";

import { CustomIcon } from "@/shared/ui";

import { PriceSection } from "./ui";

interface ICoursePriceFormProps {
	course: Course;
}

export const CoursePrice: FC<ICoursePriceFormProps> = ({ course }) => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-x-2">
				<CustomIcon icon={CircleDollarSign} />
				<h2 className="text-xl font-semibold">Sell your course</h2>
			</div>
			<PriceSection initialData={course} />
		</div>
	);
};
