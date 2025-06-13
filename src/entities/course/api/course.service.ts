import { Attachment, Course } from "@prisma/client";
import axios from "axios";

import { prisma } from "@/shared/database";

import { IAddAttachment, ICourseTitleForm } from "../types";

export const CourseService = {
	async create(data: ICourseTitleForm) {
		return await axios.post("/api/courses", data);
	},

	async getById(
		id: string
	): Promise<(Course & { attachments: Attachment[] }) | null> {
		return await prisma.course.findUnique({
			where: { id },
			include: {
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
	}
};
