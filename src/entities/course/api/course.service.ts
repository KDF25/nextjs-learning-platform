import { Course } from "@prisma/client";
import axios from "axios";

import { prisma } from "@/shared/database";

import { ICourseCreateForm } from "../types";

export const CourseService = {
	async create(data: ICourseCreateForm) {
		return await axios.post("/api/courses", data);
	},

	async getById(id: string): Promise<Course | null> {
		return await prisma.course.findUnique({ where: { id } });
	},

	async update(data: Course) {
		return await axios.patch(`/api/courses/${data.id}`, data);
	}
};
