import { prisma } from "@/shared/database";

export const CategoryService = {
	async getCategories() {
		return await prisma.category.findMany({
			orderBy: {
				name: "asc"
			}
		});
	}
};
