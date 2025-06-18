import { Chapter } from "@prisma/client";
import axios from "axios";

import { prisma } from "@/shared/database";

import { IAddChapter, ICharperPosition } from "../types";

export const ChapterService = {
	async getById(
		chapterId: string,
		courseId: string
	): Promise<Chapter | null> {
		return await prisma.chapter.findUnique({
			where: { id: chapterId, courseId },
			include: {
				muxData: true
			}
		});
	},

	async update(courseId: string, data: Chapter) {
		return await axios.patch(
			`/api/courses/${courseId}/chapters/${data.id}`,
			data
		);
	},

	async add(data: IAddChapter) {
		return await axios.post(`/api/courses/${data.id}/chapters`, data);
	},

	async delete(courseId: string, chapterId: string) {
		return await axios.delete(
			`/api/courses/${courseId}/chapters/${chapterId}`
		);
	},

	async updatePosition(courseId: string, data: ICharperPosition[]) {
		return await axios.put(
			`/api/courses/${courseId}/chapters/reorder`,
			data
		);
	},

	async publish(courseId: string, chapterId: string) {
		return await axios.patch(
			`/api/courses/${courseId}/chapters/${chapterId}/publish`
		);
	},

	async unpublish(courseId: string, chapterId: string) {
		return await axios.patch(
			`/api/courses/${courseId}/chapters/${chapterId}/unpublish`
		);
	}
};
