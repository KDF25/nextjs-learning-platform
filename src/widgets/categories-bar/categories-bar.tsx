"use client";

import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { FC } from "react";

import { CategoryCard } from "@/entities/category";

interface ICategoriesBarProps {
	items: Category[];
}

export const CategoriesBar: FC<ICategoriesBarProps> = ({ items }) => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentCategoryId = searchParams.get("categoryId");
	const currentTitle = searchParams.get("title");

	const handleClick = (id: string, isActive: boolean) => {
		const url = qs.stringifyUrl(
			{
				url: pathname,
				query: {
					categoryId: isActive ? null : id,
					title: currentTitle
				}
			},
			{ skipEmptyString: true, skipNull: true }
		);

		router.push(url);
	};

	return (
		<div className="flex items-center gap-x-2 overflow-x-auto custom-scroll pb-3">
			{items.map((item) => (
				<CategoryCard
					key={item.id}
					item={item}
					isActive={item.id === currentCategoryId}
					onClick={() =>
						handleClick(item.id, item.id === currentCategoryId)
					}
				/>
			))}
		</div>
	);
};
