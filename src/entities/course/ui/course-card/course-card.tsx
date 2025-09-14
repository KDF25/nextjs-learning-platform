import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { formatPrice } from "@/shared/lib";
import { CustomIcon, CustomProgress } from "@/shared/ui";

import { ICourseBaseData } from "../../types";

interface ICourseCardProps {
	card: ICourseBaseData;
}

export const CourseCard: FC<ICourseCardProps> = ({ card }) => {
	return (
		<Link href={`/courses/${card.id}`}>
			<div className="group hover:shadow-cm transition overflow-hidden border rounded-lg p-3 h-full flex flex-col gap-2 bg-background/70">
				<div className="relative w-full aspect-video rounded-md overflow-hidden">
					<Image
						fill
						className="object-cover"
						alt={card?.title || "Course image"}
						src={card?.imageUrl || ""}
					/>
				</div>
				<div className="flex flex-col">
					<p className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
						{card?.title}
					</p>
					<p className="text-sm text-muted-foreground">
						{card?.category?.name}
					</p>
					<div className="flex items-center gap-x-2 text-sm md:text-xs">
						<div className="flex items-center gap-x-1 text-slate-500">
							<CustomIcon icon={BookOpen} size="sm" />
							<span>
								{card?.chapters?.length}{" "}
								{card?.chapters.length > 1
									? "Chapters"
									: "Chapter"}
							</span>
						</div>
					</div>
					{card?.progress !== null ? (
						<CustomProgress
							progress={card?.progress}
							size={"sm"}
							variant={
								card?.progress === 100 ? "success" : "default"
							}
						/>
					) : (
						<p className="text-md md:text-sm font-medium text-slate-700">
							{formatPrice(card?.price || 0)}
						</p>
					)}
				</div>
			</div>
		</Link>
	);
};
