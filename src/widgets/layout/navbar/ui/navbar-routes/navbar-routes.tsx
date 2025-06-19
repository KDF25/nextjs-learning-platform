"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";

import { ChangeMode } from "../change-mode";
import { Logout } from "../logout";
import { SearchInput } from "../search-input";

export const NavbarRoutes: FC = ({}) => {
	const pathname = usePathname();

	const isTeacherPage = pathname?.startsWith(ENUM_PATH.TEACHER_PATHS);
	const isPlayerPage = pathname?.includes(ENUM_PATH.PLAYER_PATHS);
	const isSearchPage = pathname === ENUM_PATH.SEARCH;

	return (
		<>
			{isSearchPage && (
				<div className="hidden md:block">
					<SearchInput />
				</div>
			)}
			<div className="flex gap-x-2 ml-auto">
				{isTeacherPage || isPlayerPage ? <Logout /> : <ChangeMode />}
				<UserButton />
			</div>
		</>
	);
};
