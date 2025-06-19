"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { FC, useEffect, useState } from "react";

import { useDebounce } from "@/shared/hooks";
import { Input } from "@/shared/ui";

interface ISearchInputProps {
	// add your props here
}

export const SearchInput: FC<ISearchInputProps> = ({}) => {
	const [value, setValue] = useState("");
	const debouncedValue = useDebounce(value, 500);

	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const currentCategoryId = searchParams.get("categoryId");

	useEffect(() => {
		const url = qs.stringifyUrl(
			{
				url: pathname,
				query: {
					title: debouncedValue,
					categoryId: currentCategoryId
				}
			},
			{ skipEmptyString: true, skipNull: true }
		);
		router.push(url);
	}, [debouncedValue, currentCategoryId, router, pathname]);

	return (
		<div className="relative">
			<Search
				size={16}
				className="absolute top-3 left-3 text-slate-600"
			/>
			<Input
				onChange={(e) => setValue(e.target.value)}
				className="w-full md:w-[300px] pl-10 rounded-full bg-slate-100 focus-visible:ring-slate-200"
				placeholder="Search for a course"
			/>
		</div>
	);
};
