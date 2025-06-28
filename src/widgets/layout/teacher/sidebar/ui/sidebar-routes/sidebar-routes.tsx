"use client";

import { usePathname } from "next/navigation";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";

import { SIDEBAR_GUEST_ROUTES, SIDEBAR_TEACHER_ROUTES } from "../../model";
import { SidebarItem } from "../sidebar-item";

export const SidebarRoutes: FC = ({}) => {
	const pathname = usePathname();
	const isTeacher = pathname?.startsWith(ENUM_PATH.TEACHER.ROOT);
	const routes = isTeacher ? SIDEBAR_TEACHER_ROUTES : SIDEBAR_GUEST_ROUTES;
	return (
		<div className="flex flex-col w-full">
			{routes.map((item) => (
				<SidebarItem key={item.href} {...item} />
			))}
		</div>
	);
};
