import { Attachment, Chapter, Course } from "@prisma/client";
import axios from "axios";

import { prisma } from "@/shared/database";

import { ICourseTitleForm } from "../types";

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
	}
};
