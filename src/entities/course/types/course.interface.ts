import {
	Category,
	Chapter,
	Course,
	Purchase,
	UserProgress
} from "@prisma/client";
import z from "zod";

import {
	formSchemaCourseCategory,
	formSchemaCourseDescription,
	formSchemaCoursePrice,
	formSchemaCourseTitle
} from "../helpers";

export type ICourseTitleForm = z.infer<typeof formSchemaCourseTitle>;

export type ICourseDescriptionForm = z.infer<
	typeof formSchemaCourseDescription
>;

export type ICourseCategoryForm = z.infer<typeof formSchemaCourseCategory>;

export type ICoursePriceForm = z.infer<typeof formSchemaCoursePrice>;

export type ICourseBaseData = Course & {
	category: Category | null;
	chapters: { id: string }[];
	progress: number | null;
};

export type GetTeacherCourses = {
	userId: string;
	title?: string;
	categoryId?: string;
};

export type GetUserCourses = Course & {
	chapters: (Chapter & { userProgress: UserProgress[] | null })[];
};

export type DashboardUserCourse = Course & {
	category: Category | null;
	chapters: Chapter[];
	progress: number | null;
};

export type GetUserDashboardCourses = {
	completed: DashboardUserCourse[];
	inProgress: DashboardUserCourse[];
};

export type PurchaseCourse = Purchase & {
	course: Course;
};

export interface IChart {
	name: string;
	total: number;
}
