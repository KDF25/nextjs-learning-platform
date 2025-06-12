import { PrismaClient } from "@prisma/client";

import { CATEGORIES } from "./constants";

const database = new PrismaClient();

async function seeding_categories() {
	try {
		console.log("🌱 Seeding database categories");
		await database.category.createMany({
			data: CATEGORIES
		});
		console.log("✅ Database categories seeded");
	} catch (error) {
		console.log("❌ Error seeding database categories", error);
	} finally {
		await database.$disconnect();
	}
}

async function main() {
	await seeding_categories();
}

main();
