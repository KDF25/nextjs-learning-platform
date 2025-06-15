import { Attachment, Chapter, Course } from "@prisma/client";
import axios from "axios";

import { prisma } from "@/shared/database";

import {
	IAddAttachment,
	IAddChapter,
	ICharperPosition,
	ICourseTitleForm
} from "../types";

export const CourseService = {
	async create(data: ICourseTitleForm) {
		return await axios.post("/api/courses", data);
	},

	async getById(
		userId: string,
		id: string
	): Promise<
		| (Course & { attachments: Attachment[] } & { chapters: Chapter[] })
		| null
	> {
		return await prisma.course.findUnique({
			where: { id, userId },
			include: {
				chapters: {
					orderBy: {
						position: "asc"
					}
				},
				attachments: {
					orderBy: {
						createdAt: "desc"
					}
				}
			}
		});
	},

	async update(data: Course) {
		return await axios.patch(`/api/courses/${data.id}`, data);
	},

	async addAttachment(data: IAddAttachment) {
		return await axios.post(`/api/courses/${data.id}/attachments`, data);
	},

	async deleteAttachment(courseId: string, attachmentId: string) {
		return await axios.delete(
			`/api/courses/${courseId}/attachments/${attachmentId}`
		);
	},

	async addChapter(data: IAddChapter) {
		return await axios.post(`/api/courses/${data.id}/chapters`, data);
	},

	async deleteChapters(courseId: string, attachmentId: string) {
		return await axios.delete(
			`/api/courses/${courseId}/chapters/${attachmentId}`
		);
	},

	async updatePositionChapters(courseId: string, data: ICharperPosition[]) {
		return await axios.put(
			`/api/courses/${courseId}/chapters/reorder`,
			data
		);
	}
};
