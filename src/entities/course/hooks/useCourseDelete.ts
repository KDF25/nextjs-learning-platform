"use client";

import { useState } from "react";

import { CourseApi } from "../api";

export const useCourseDelete = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const deleteCourse = async (courseId: string) => {
		try {
			setIsLoading(true);
			await CourseApi.delete(courseId);
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
		deleteCourse
	};
};
