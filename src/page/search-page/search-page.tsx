import { auth } from "@clerk/nextjs/server";
import { FC } from "react";

import { CategoryService } from "@/entities/category";
import { CourseService } from "@/entities/course";

import { CategoriesBar } from "@/widgets/categories-bar";
import { CoursesList } from "@/widgets/courses-list";
import { SearchInput } from "@/widgets/layout/navbar";

interface SearchPageProps {
	searchParams: {
		title?: string;
		categoryId?: string;
	};
}

export const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
	const { userId } = await auth();
	const categories = await CategoryService.getCategories();
	const { title, categoryId } = searchParams;

	const courses = await CourseService.getCourses({
		userId: userId || "",
		title,
		categoryId
	});
	console.log(courses);
	return (
		<>
			<div className="px-6 pt-6 md:hidden md: mb: 0 block">
				<SearchInput />
			</div>
			<div className="p-6 space-y-4">
				<CategoriesBar items={categories} />
				<CoursesList courses={courses} />
			</div>
		</>
	);
};
