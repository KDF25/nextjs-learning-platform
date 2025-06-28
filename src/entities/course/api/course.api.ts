import { Course } from "@prisma/client";
import axios from "axios";

import { ICourseTitleForm } from "../types";

export const CourseApi = {
	async create(data: ICourseTitleForm): Promise<Course> {
		const response = await axios.post<Course>("/api/courses", data);
		return response.data;
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
	},

	async checkout(courseId: string) {
		return await axios.post(`/api/courses/${courseId}/checkout`);
	}
};
