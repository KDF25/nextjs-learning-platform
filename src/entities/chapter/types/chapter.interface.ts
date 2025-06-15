import z from "zod";

import {
	formSchemaChapterDescription,
	formSchemaChapterTitle
} from "../helpers";

export interface IAddChapter {
	id: string;
	userId: string;
	title: string;
}

export interface ICharperPosition {
	id: string;
	position: number;
}

export type IChapterTitleForm = z.infer<typeof formSchemaChapterTitle>;

export type IChapterDescriptionForm = z.infer<
	typeof formSchemaChapterDescription
>;
