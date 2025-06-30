import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
	await categories();
	await courses();
}

async function courses() {
	const courses = await prisma.course.findMany({
		include: {
			chapters: {
				include: {
					muxData: true
				}
			},
			attachments: true,
			category: true
		}
	});

	const exportPath = path.join(__dirname, "courses-export.json");

	fs.writeFileSync(exportPath, JSON.stringify(courses, null, 2), "utf-8");

	console.log("✅ Курсы экспортированы в", exportPath);
}

async function categories() {
	const categories = await prisma.category.findMany();

	const exportPath = path.join(__dirname, "categories-export.json");

	fs.writeFileSync(exportPath, JSON.stringify(categories, null, 2), "utf-8");

	console.log("✅ Категории экспортированы в", exportPath);
}

main()
	.catch((e) => {
		console.error("❌ Ошибка при экспорте курсов:", e);
	})
	.finally(() => prisma.$disconnect());
