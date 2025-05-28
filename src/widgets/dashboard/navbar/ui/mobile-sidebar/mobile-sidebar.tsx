"use client";

import { Menu } from "lucide-react";
import { FC } from "react";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger
} from "@/shared/ui";

import { Sidebar } from "@/widgets/dashboard/sidebar";

export const MobileSidebar: FC = ({}) => {
	return (
		<Sheet>
			<SheetTrigger className="md:hidden pr-4 hover:opacity-80 transition-opacity">
				<Menu />
			</SheetTrigger>
			<SheetContent side="left" className="p-0 bg-white">
				<SheetTitle className="sr-only" />
				<SheetDescription className="sr-only" />
				<Sidebar />
			</SheetContent>
		</Sheet>
	);
};
