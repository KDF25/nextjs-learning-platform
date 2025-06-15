import z from "zod";

export const formSchemaChapterTitle = z.object({
	title: z.string().min(1, { message: "Title is required" })
});

export const formSchemaChapterDescription = z.object({
	description: z.string().min(1, { message: "Description is required" })
});
