"use client";

import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable
} from "@hello-pangea/dnd";
import { Chapter } from "@prisma/client";
import { Grip, Pencil } from "lucide-react";
import { FC, useEffect, useState } from "react";

import { useMounted } from "@/shared/hooks";
import { cn } from "@/shared/lib";
import { Badge } from "@/shared/ui";

import { ICharperPosition } from "@/entities/chapter";

interface IChapterListProps {
	chapters: Chapter[];
	onReorder: (updateData: ICharperPosition[]) => void;
	onEdit: (id: string) => void;
}

export const ChapterList: FC<IChapterListProps> = ({
	chapters: initialChapters,
	onReorder,
	onEdit
}) => {
	const { isMounted } = useMounted();
	const [chapters, setChapters] = useState<Chapter[]>(initialChapters);

	useEffect(() => {
		setChapters(initialChapters);
	}, [initialChapters]);

	if (!isMounted) {
		return null;
	}

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;
		const items = Array.from(chapters);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		const startIndex = Math.min(
			result.source.index,
			result.destination.index
		);
		const endIndex = Math.max(
			result.source.index,
			result.destination.index
		);
		const updateData = items.slice(startIndex, endIndex + 1);
		setChapters(items);

		const bulkUpdateData = updateData.map((chapter) => ({
			id: chapter.id,
			position: items.findIndex((item) => item.id === chapter.id)
		}));

		onReorder(bulkUpdateData);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="chapters">
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{chapters.map((chapter, index) => (
							<Draggable
								key={chapter.id}
								draggableId={chapter.id}
								index={index}
							>
								{(provided) => (
									<div
										className={cn(
											"flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
											chapter?.isPublished &&
												"bg-sky-100 border-sky-200 text-sky-700"
										)}
										ref={provided.innerRef}
										{...provided.draggableProps}
									>
										<div
											className={cn(
												"px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
												chapter?.isPublished &&
													"border-sky-200 hover:bg-sky-200"
											)}
											{...provided.dragHandleProps}
										>
											<Grip size={16} />
										</div>
										<p className="truncate">
											{chapter?.title}
										</p>
										<div className="ml-auto flex items-center gap-x-2 mr-2">
											{chapter?.isFree && (
												<Badge> Free</Badge>
											)}
											<Badge
												className={cn(
													"bg-slate-500",
													chapter?.isPublished &&
														"bg-sky-700"
												)}
											>
												{chapter?.isPublished
													? "Published"
													: "Draft"}
											</Badge>
											<Pencil
												size={16}
												onClick={() =>
													onEdit(chapter.id)
												}
												className="cursor-pointer hover:opacity-75 transition"
											/>
										</div>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};
