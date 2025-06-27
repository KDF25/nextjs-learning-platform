import { Category, Course } from "@prisma/client";
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

export type GetCourses = {
	userId: string;
	title?: string;
	categoryId?: string;
};
