"use client";

import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderButton, PriceCell, PublishCell, TableActions } from "../ui";

export const COURSES_COLUMNS_LIST: ColumnDef<Course>[] = [
	{
		accessorKey: "title",
		header: ({ column }) => {
			return (
				<HeaderButton
					title="Title"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				/>
			);
		}
	},
	{
		accessorKey: "price",
		header: ({ column }) => {
			return (
				<HeaderButton
					title="Price"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				/>
			);
		},
		cell: ({ row }) => {
			const { price } = row.original;
			return <PriceCell price={price || 0} />;
		}
	},
	{
		accessorKey: "isPublished",
		header: ({ column }) => {
			return (
				<HeaderButton
					title="Published"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				/>
			);
		},
		cell: ({ row }) => {
			const { isPublished } = row.original;
			return <PublishCell isPublished={isPublished} />;
		}
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const { id } = row.original;
			return <TableActions id={id} />;
		}
	}
];
