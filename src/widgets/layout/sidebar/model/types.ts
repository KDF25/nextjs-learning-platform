import { LucideIcon } from "lucide-react";

import { ENUM_PATH } from "@/shared/config";

export interface ISidebarItem {
	icon: LucideIcon;
	label: string;
	href: ENUM_PATH;
}
