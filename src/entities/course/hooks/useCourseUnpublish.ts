"use client";

import { useState } from "react";

import { CourseApi } from "../api";

export const useCourseUnpublish = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const unpublish = async (courseId: string) => {
		try {
			setIsLoading(true);
			await CourseApi.unpublish(courseId);
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
		unpublish
	};
};
