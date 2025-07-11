"use client";

import { Chapter, UserProgress } from "@prisma/client";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";
import { cn } from "@/shared/lib";

interface ICourseSidebarItemProps {
	item: Chapter & { userProgress: UserProgress[] | null };
	isLocked: boolean;
}

export const CourseSidebarItem: FC<ICourseSidebarItemProps> = ({
	item,
	isLocked
}) => {
	const pathname = usePathname();
	const router = useRouter();

	const Icon = isLocked
		? Lock
		: item?.userProgress?.[0]?.isCompleted
			? CheckCircle
			: PlayCircle;

	const isActive = pathname?.includes(item?.id);
	const isCompleted = item?.userProgress?.[0]?.isCompleted;

	const handleClick = () => {
		if (isActive) return;
		router.push(ENUM_PATH.COURSES.CHAPTER(item?.courseId, item?.id));
	};

	return (
		<button
			onClick={handleClick}
			type="button"
			className={cn(
				"flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transparent-all hover:text-slate-600 hover:bg-slate-300/20",
				isActive &&
					"text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
				isCompleted && "text-emerald-700 hover:text-emerald-700",
				isCompleted && isActive && "bg-emerald-200/20"
			)}
		>
			<div className="flex item-center gap-x-2 py-4 overflow-hidden">
				<div>
					<Icon
						className={cn(
							"text-slate-500 w-6 h-6",
							isActive && "text-slate-700",
							isCompleted && "text-emerald-700"
						)}
					/>
				</div>
				<p className="truncate">{item?.title}</p>
			</div>
			<div
				className={cn(
					"ml-auto opacity-0 border-2 h-full transition-all",
					isActive && "opacity-100 border-slate-700",
					isActive && isCompleted && "border-emerald-700"
				)}
			></div>
		</button>
	);
};
