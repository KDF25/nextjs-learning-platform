import { Category } from "@prisma/client";

import { prisma } from "@/shared/database";

export const CategoryService = {
	async getCategories(): Promise<Category[]> {
		return await prisma.category.findMany({
			orderBy: {
				name: "asc"
			}
		});
	}
};
