"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import { Pencil } from "lucide-react";
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

import {
	CourseService,
	ICourseTitleForm,
	formSchemaCourseTitle
} from "@/entities/course";

interface ITitleSectionProps {
	initialData: Course;
}

export const TitleSection: FC<ITitleSectionProps> = ({ initialData }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const router = useRouter();
	const form = useForm<ICourseTitleForm>({
		resolver: zodResolver(formSchemaCourseTitle),
		defaultValues: {
			title: initialData?.title
		}
	});
	const {
		formState: { isSubmitting, isValid },
		handleSubmit
	} = form;

	const onSubmit = async (data: ICourseTitleForm) => {
		try {
			await CourseService.update({
				id: initialData?.id,
				userId: initialData?.userId,
				title: data?.title
			} as Course);
			toast.success("Title updated");
			router.refresh();
			setIsEditing(false);
		} catch {
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="border bg-slate-100 rounded-md p-4 flex flex-col gap-1">
			<div className="font-medium flex items-center justify-between">
				Course title
				<Button
					variant={"ghost"}
					className="flex flex-row gap-1"
					onClick={() => setIsEditing(!isEditing)}
				>
					{isEditing ? (
						<>Cancel</>
					) : (
						<>
							<Pencil size={12} />
							Edit title
						</>
					)}
				</Button>
			</div>
			{isEditing ? (
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
											placeholder="e.g. Introduction to React"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							disabled={
								!isValid ||
								isSubmitting ||
								initialData.title === form.getValues("title")
							}
							type="submit"
						>
							Save
						</Button>
					</form>
				</Form>
			) : (
				<div className="text-sm text-slate-600">
					{initialData.title}
				</div>
			)}
		</div>
	);
};
