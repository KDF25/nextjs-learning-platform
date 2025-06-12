import z from "zod";

export const formSchemaCourseCreate = z.object({
	title: z.string().min(1, { message: "Title is required" })
});

export const formSchemaCourseCustom = z.object({
	title: z.string().min(1, { message: "Title is required" }),
	description: z.string().min(1, { message: "Description is required" }),
	imageUrl: z.string().min(1, { message: "Image is required" })
});
