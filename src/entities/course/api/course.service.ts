import { Attachment, Chapter, Course } from "@prisma/client";
import axios from "axios";

import { prisma } from "@/shared/database";

import { ICourseTitleForm } from "../types";

export const CourseService = {
	async create(data: ICourseTitleForm): Promise<Course> {
		const response = await axios.post<Course>("/api/courses", data);
		return response.data;
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

	async getAll(userId: string): Promise<Course[]> {
		return await prisma.course.findMany({
			where: { userId },
			orderBy: {
				createdAt: "desc"
			}
		});
	},

	async update(data: Course) {
		return await axios.patch(`/api/courses/${data.id}`, data);
	},

	async delete(courseId: string) {
		return await axios.delete(`/api/courses/${courseId}`);
	},

	async publish(courseId: string) {
		return await axios.patch(`/api/courses/${courseId}/publish`);
	},

	async unpublish(courseId: string) {
		return await axios.patch(`/api/courses/${courseId}/unpublish`);
	}
};
