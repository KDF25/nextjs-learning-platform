"use client";

import { Chapter, UserProgress } from "@prisma/client";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

import { cn } from "@/shared/lib";

interface ICourseSidebarItemProps {
	item: Chapter & { userProgress: UserProgress[] | null };
}

export const CourseSidebarItem: FC<ICourseSidebarItemProps> = ({ item }) => {
	const pathname = usePathname();
	const router = useRouter();

	const Icon = !item?.isFree
		? Lock
		: item?.userProgress?.[0]?.isCompleted
			? CheckCircle
			: PlayCircle;

	const isActive = pathname?.includes(item?.id);
	const isCompleted = item?.userProgress?.[0]?.isCompleted;

	const handleClick = () => {
		if (isActive) return;
		router.push(`/course/${item?.courseId}/chapter/${item?.id}`);
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
			<div className="flex item-center gap-x-2 py-4">
				<Icon
					size={22}
					className={cn(
						"text-slate-500",
						isActive && "text-slate-700",
						isCompleted && "text-emerald-700"
					)}
				/>
				<p className="truncate">{item?.title}</p>
			</div>
			<div
				className={cn(
					"ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
					isActive && "opacity-100",
					isCompleted && "opacity-100 border-emerald-700"
				)}
			></div>
		</button>
	);
};
