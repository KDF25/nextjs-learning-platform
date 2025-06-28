import {
	Attachment,
	Chapter,
	Course,
	MuxData,
	Purchase,
	UserProgress
} from "@prisma/client";
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

export type GetTeacherChapter = Chapter & { muxData: MuxData | null };

export interface GetUserChapter {
	chapter: Chapter | null;
	course: Pick<Course, "price"> | null;
	muxData: MuxData | null;
	attachments: Attachment[];
	nextChapter: Chapter | null;
	userProgress: UserProgress | null;
	purchase: Purchase | null;
}
