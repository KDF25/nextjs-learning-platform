import { PrismaClient } from "@prisma/client";

import { CATEGORIES } from "./categories-data";
import { COURSES } from "./courses-data";

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

async function seeding_courses() {
	try {
		console.log("🌱 Seeding database courses");

		COURSES.forEach(async (course, index) => {
			await database.course.create({
				data: course
			});
			console.log(`✅ Seed ${index + 1} done | ${course.title}`);
		});

		console.log("✅ Database courses seeded");
	} catch (error) {
		console.log("❌ Error seeding database courses", error);
	} finally {
		await database.$disconnect();
	}
}

async function main() {
	await seeding_categories();
	await seeding_courses();
}

main();
