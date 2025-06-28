import { Purchase } from "@prisma/client";

import { prisma } from "@/shared/database";

export const PurchaseService = {
	async getPurchases(
		userId: string,
		courseId: string
	): Promise<Purchase | null> {
		try {
			return await prisma.purchase.findUnique({
				where: { userId_courseId: { userId, courseId } }
			});
		} catch (error) {
			console.log("[PurchaseService] getPurchases", error);
			return null;
		}
	}
};
