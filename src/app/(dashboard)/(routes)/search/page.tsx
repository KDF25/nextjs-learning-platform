import { FC } from "react";

import { SearchPage } from "@/page/user";

interface SearchPageProps {
	searchParams: Promise<Record<string, string>>;
}

const Search: FC<SearchPageProps> = async ({ searchParams }) => {
	return <SearchPage searchParams={await searchParams} />;
};

export default Search;
