"use client";

import { useState } from "react";

import { CourseApi } from "../api";

export const useCourseDelete = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const deleteChapter = async (courseId: string) => {
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
		deleteChapter
	};
};
