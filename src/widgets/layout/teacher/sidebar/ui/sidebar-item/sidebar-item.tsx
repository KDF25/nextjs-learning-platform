"use client";

import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

import { cn } from "@/shared/lib";

import { ISidebarItem } from "../../model/types";

interface ISidebarItemProps extends ISidebarItem {}

export const SidebarItem: FC<ISidebarItemProps> = ({
	icon: Icon,
	label,
	href
}) => {
	const pathname = usePathname();
	const router = useRouter();

	const isActive = pathname === href || pathname?.startsWith(`${href}/`);

	const handleClick = () => {
		// if (isActive) return;
		router.push(href);
	};

	return (
		<button
			onClick={handleClick}
			type="button"
			className={cn(
				"flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transparent-all hover:text-slate-600 hover:bg-slate-300/20",
				isActive &&
					"text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
			)}
		>
			<div className="flex item-center gap-x-2 py-4">
				<Icon
					size={22}
					className={cn("text-slate-500", isActive && "text-sky-700")}
				/>
				{label}
			</div>
			<div
				className={cn(
					"ml-auto opacity-0 transition-all h-full border-2 border-sky-700 duration-100",
					isActive && "opacity-100"
				)}
			></div>
		</button>
	);
};
