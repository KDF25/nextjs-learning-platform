"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";

import { ChangeMode } from "../../../widgets/layout/teacher/navbar/ui/change-mode";
import { Logout } from "../../../widgets/layout/teacher/navbar/ui/logout";
import { SearchInput } from "../../../widgets/layout/teacher/navbar/ui/search-input";

export const NavbarRoutes: FC = ({}) => {
	const pathname = usePathname();

	const isTeacherPage = pathname?.startsWith(ENUM_PATH.TEACHER_PATHS);
	const isCoursePage = pathname?.includes(ENUM_PATH.COURSE_PATHS);
	const isSearchPage = pathname === ENUM_PATH.SEARCH;

	return (
		<>
			{isSearchPage && (
				<div className="hidden md:block">
					<SearchInput />
				</div>
			)}
			<div className="flex gap-x-2 ml-auto">
				{isTeacherPage || isCoursePage ? <Logout /> : <ChangeMode />}
				<UserButton />
			</div>
		</>
	);
};
