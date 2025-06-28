"use client";

import { useState } from "react";

import { ChapterApi } from "../api";

export const useChapterPublish = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const publish = async (courseId: string, chapterId: string) => {
		try {
			setIsLoading(true);
			await ChapterApi.publish(courseId, chapterId);
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
