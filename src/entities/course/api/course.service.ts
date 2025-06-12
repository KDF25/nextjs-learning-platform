import { Course } from "@prisma/client";
import axios from "axios";

import { prisma } from "@/shared/database";

import { ICourseTitleForm } from "../types";

export const CourseService = {
	async create(data: ICourseTitleForm) {
		return await axios.post("/api/courses", data);
	},

	async getById(id: string): Promise<Course | null> {
		return await prisma.course.findUnique({ where: { id } });
	},

	async update(data: Course) {
		return await axios.patch(`/api/courses/${data.id}`, data);
	}
};
