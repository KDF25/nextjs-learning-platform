"use client";

import { FC } from "react";
import toast from "react-hot-toast";

import { formatPrice } from "@/shared/lib";
import { Button } from "@/shared/ui";

import { useCourseCheckout } from "@/entities/course";

interface IEnrollCourseProps {
	price: number;
	courseId: string;
}

export const EnrollCourse: FC<IEnrollCourseProps> = ({ price, courseId }) => {
	const { checkout, isLoading } = useCourseCheckout();

	const handleCheckout = () => {
		checkout(courseId)
			.then((response) => {
				window.location.assign(response?.data?.url);
			})
			.catch(() => toast.error("Something went wrong"));
	};
	return (
		<Button
			className="w-full md:w-auto"
			onClick={handleCheckout}
			disabled={isLoading}
			size={"sm"}
		>
			Enroll for {formatPrice(price)}
		</Button>
	);
};
