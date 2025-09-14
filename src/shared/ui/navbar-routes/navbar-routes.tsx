"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";

import { ChangeMode } from "@/widgets/layout/teacher/navbar/ui/change-mode";
import { Logout } from "@/widgets/layout/teacher/navbar/ui/logout";
import { SearchInput } from "@/widgets/layout/teacher/navbar/ui/search-input";
import {
	SIDEBAR_GUEST_ROUTES,
	SIDEBAR_TEACHER_ROUTES
} from "@/widgets/layout/teacher/sidebar/model";

export const NavbarRoutes: FC = ({}) => {
	const pathname = usePathname();

	const isTeacherPage = pathname?.startsWith(ENUM_PATH.TEACHER.ROOT);
	const isCoursePage = pathname?.includes(ENUM_PATH.COURSES.ROOT);
	const isSearchPage = pathname === ENUM_PATH.SEARCH;
	const routes = isTeacherPage
		? SIDEBAR_TEACHER_ROUTES
		: SIDEBAR_GUEST_ROUTES;

	return (
		<>
			{isSearchPage && (
				<div className="hidden md:block">
					<SearchInput />
				</div>
			)}
			<div className="flex gap-x-2 ml-auto">
				<div className="flex md:hidden gap-6">
					{routes.map((item) => (
						<Link
							href={item.href}
							key={item.href}
							className="flex items-center gap-x-2   text-sm font-[500] "
						>
							<p>{item.label}</p>
						</Link>
					))}
				</div>
				{isTeacherPage || isCoursePage ? <Logout /> : <ChangeMode />}
				<UserButton />
			</div>
		</>
	);
};
