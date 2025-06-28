import { FC } from "react";

import { NavbarRoutes } from "@/shared/ui";

import { MobileSidebar } from "./ui";

export const Navbar: FC = ({}) => {
	return (
		<div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
			<MobileSidebar />
			<NavbarRoutes />
		</div>
	);
};
