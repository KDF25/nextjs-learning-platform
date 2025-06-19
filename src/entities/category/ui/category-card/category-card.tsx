import { Category } from "@prisma/client";
import { FC } from "react";

import { cn } from "@/shared/lib";

interface ICategoryCardProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	item: Category;
	isActive?: boolean;
}

export const CategoryCard: FC<ICategoryCardProps> = ({
	item,
	isActive,
	...props
}) => {
	return (
		<button
			className={cn(
				"py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
				isActive && "bg-sky-200/20 text-sky-800 border-sky-700"
			)}
			type="button"
			{...props}
		>
			<div className="truncate">{item?.name}</div>
		</button>
	);
};
