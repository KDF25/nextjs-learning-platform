import { FC } from "react";

import { Logo, SidebarRoutes } from "./ui";

// interface SidebarProps {}

export const Sidebar: FC = () => {
	return (
		<div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
			<div className="flex items-center justify-start p-6">
				<Logo />
			</div>
			<div className="flex flex-col w-full">
				<SidebarRoutes />
			</div>
		</div>
	);
};
