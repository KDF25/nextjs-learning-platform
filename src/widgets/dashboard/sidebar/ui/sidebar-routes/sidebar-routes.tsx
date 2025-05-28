"use client";

import { FC } from "react";

import { SIDEBAR_GUEST_ROUTES } from "../../model";
import { SidebarItem } from "../sidebar-item";

export const SidebarRoutes: FC = ({}) => {
	const routes = SIDEBAR_GUEST_ROUTES;
	return (
		<div className="flex flex-col w-full">
			{routes.map((item) => (
				<SidebarItem key={item.href} {...item} />
			))}
		</div>
	);
};
