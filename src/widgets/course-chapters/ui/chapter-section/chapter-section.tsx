"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter, Course } from "@prisma/client";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	Input
} from "@/shared/ui";

import { ChapterService, ICharperPosition } from "@/entities/chapter";
import { ICourseTitleForm, formSchemaCourseTitle } from "@/entities/course";

import { ChapterList } from "../chapter-list";

interface IChapterSectionProps {
	initialData: Course & { chapters: Chapter[] };
}

export const ChapterSection: FC<IChapterSectionProps> = ({ initialData }) => {
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const [isUpdating, setIsUpdating] = useState<boolean>(false);

	const router = useRouter();
	const form = useForm<ICourseTitleForm>({
		resolver: zodResolver(formSchemaCourseTitle),
		defaultValues: {
			title: ""
		}
	});
	const {
		formState: { isSubmitting, isValid },
		handleSubmit
	} = form;

	const onSubmit = async (data: ICourseTitleForm) => {
		try {
			await ChapterService.add({
				id: initialData?.id,
				userId: initialData?.userId,
				title: data?.title
			});
			toast.success("Chapter updated");
			router.refresh();
			setIsCreating(false);
		} catch {
			toast.error("Something went wrong");
		}
	};

	const onReorder = async (updateData: ICharperPosition[]) => {
		try {
			setIsUpdating(true);
			await ChapterService.updatePosition(initialData?.id, updateData);
			toast.success("Chapter reordered");
			router.refresh();
		} catch {
			toast.error("Something went wrong");
		} finally {
			setIsUpdating(false);
		}
	};

	const onEdit = (id: string) => {
		router.push(`/teacher/courses/${initialData?.id}/chapters/${id}`);
	};

	return (
		<div className="relative border bg-slate-100 rounded-md p-4 flex flex-col gap-1 overflow-hidden">
			{isUpdating && (
				<div className="flex items-center justify-center h-full w-full bg-slate-500/20 top-0 left-0 absolute ">
					<Loader2 size={32} className="animate-spin text-sky-700" />
				</div>
			)}
			<div className="font-medium flex items-center justify-between">
				Course chapters
				<Button
					variant={"ghost"}
					className="flex flex-row gap-1"
					onClick={() => setIsCreating(!isCreating)}
				>
					{isCreating ? (
						<>Cancel</>
					) : (
						<>
							<PlusCircle size={12} />
							Add a chapter
						</>
					)}
				</Button>
			</div>
			{isCreating && (
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4   flex flex-col gap-2"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className="bg-white">
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. Introduction to the course..."
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							disabled={!isValid || isSubmitting}
							type="submit"
						>
							Create
						</Button>
					</form>
				</Form>
			)}
			{!isCreating && (
				<div className="flex flex-col gap-2">
					<p className="text-sm text-slate-600">
						{!initialData?.chapters?.length && "No chapters yet"}
					</p>
					<ChapterList
						chapters={initialData?.chapters || []}
						onEdit={onEdit}
						onReorder={onReorder}
					/>
				</div>
			)}
			{!isCreating && (
				<p className="text-sm text-slate-600">
					Drag and drop to reorder chapters
				</p>
			)}
		</div>
	);
};
