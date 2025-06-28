"use client";

import { useState } from "react";

import { CourseApi } from "../api";

export const useCourseCheckout = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const checkout = async (courseId: string) => {
		try {
			setIsLoading(true);
			return await CourseApi.checkout(courseId);
		} catch (error) {
			setIsError(true);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		isError,
		checkout
	};
};
