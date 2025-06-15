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

export interface IAddAttachment {
	id: string;
	userId: string;
	url: string;
	name: string;
}

export interface IAddChapter {
	id: string;
	userId: string;
	title: string;
}

export interface ICharperPosition {
	id: string;
	position: number;
}
