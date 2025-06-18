"use client";

import { useState } from "react";

import { ChapterService } from "../api";

export const useChapterUnpublish = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const unpublish = async (courseId: string, chapterId: string) => {
		try {
			setIsLoading(true);
			await ChapterService.unpublish(courseId, chapterId);
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
