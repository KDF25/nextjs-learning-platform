"use client";

import { MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/shared/ui";

interface ITableActionsProps {
	id: string;
}

export const TableActions: FC<ITableActionsProps> = ({ id }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"ghost"} className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal size={2} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<Link href={`/teacher/courses/${id}`}>
					<DropdownMenuItem className="cursor-pointer">
						<Pencil className="mr-2" size={2} />
						Edit
					</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
