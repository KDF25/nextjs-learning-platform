"use client";

import { useState } from "react";

import { CourseService } from "../api";

export const useCourseDelete = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const deleteChapter = async (courseId: string) => {
		try {
			setIsLoading(true);
			await CourseService.delete(courseId);
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
