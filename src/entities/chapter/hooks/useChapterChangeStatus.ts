"use client";

import { useState } from "react";

import { ChapterApi } from "../api";

export const useChapterChangeStatus = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const changeStatus = async (
		courseId: string,
		chapterId: string,
		isCompeted: boolean
	) => {
		try {
			setIsLoading(true);
			await ChapterApi.changeStatus(courseId, chapterId, isCompeted);
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
		changeStatus
	};
};
