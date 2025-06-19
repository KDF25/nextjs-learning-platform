import { FC } from "react";

import { CategoryService } from "@/entities/category";

import { CategoriesBar } from "@/widgets/categories-bar";
import { SearchInput } from "@/widgets/layout/navbar";

interface ISearchPageProps {
	// add your props here
}

export const SearchPage: FC<ISearchPageProps> = async ({}) => {
	const categories = await CategoryService.getCategories();

	return (
		<>
			<div className="px-6 pt-6 md:hidden md: mb: 0 block">
				<SearchInput />
			</div>
			<div className="p-6">
				<CategoriesBar items={categories} />
			</div>
		</>
	);
};
