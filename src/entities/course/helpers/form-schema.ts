import z from "zod";

export const formSchemaCourseTitle = z.object({
	title: z.string().min(1, { message: "Title is required" })
});

export const formSchemaCourseDescription = z.object({
	description: z.string().min(1, { message: "Description is required" })
});

export const formSchemaCourseCategory = z.object({
	categoryId: z.string().min(1, { message: "Category is required" })
});

export const formSchemaCoursePrice = z.object({
	price: z.coerce.number()
});
