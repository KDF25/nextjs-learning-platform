import { BarChart, Compass, Layout, List } from "lucide-react";

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

export const SIDEBAR_TEACHER_ROUTES: ISidebarItem[] = [
	{
		icon: List,
		label: "Courses",
		href: ENUM_PATH.TEACHER_COURSES
	},
	{
		icon: BarChart,
		label: "Analytics",
		href: ENUM_PATH.TEACHER_ANALYTICS
	}
];
