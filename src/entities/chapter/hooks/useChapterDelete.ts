"use client";

import { useState } from "react";

import { ChapterService } from "../api";

export const useChapterDelete = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const deleteChapter = async (courseId: string, chapterId: string) => {
		try {
			setIsLoading(true);
			await ChapterService.delete(courseId, chapterId);
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
