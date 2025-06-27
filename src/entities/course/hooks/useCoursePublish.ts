"use client";

import { useState } from "react";

import { CourseApi } from "../api";

export const useCoursePublish = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const publish = async (courseId: string) => {
		try {
			setIsLoading(true);
			await CourseApi.publish(courseId);
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
		publish
	};
};
