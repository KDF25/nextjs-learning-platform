import { Compass, Layout } from "lucide-react";

import { ENUM_PATH } from "@/shared/config";

import { ISidebarItem } from "./types";

export const SIDEBAR_GUEST_ROUTES: ISidebarItem[] = [
	{
		icon: Layout,
		label: "Dashboard",
		href: ENUM_PATH.MAIN
	},
	{
		icon: Compass,
		label: "Browse",
		href: ENUM_PATH.SEARCH
	}
];
