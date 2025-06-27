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
	Combobox,
	Form,
	FormControl,
	FormField,
	FormItem
} from "@/shared/ui";

import {
	CourseApi,
	ICourseCategoryForm,
	formSchemaCourseCategory
} from "@/entities/course";

interface ICategorySectionProps {
	initialData: Course;
	categories: { label: string; value: string }[];
}

export const CategorySection: FC<ICategorySectionProps> = ({
	initialData,
	categories
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const router = useRouter();
	const form = useForm<ICourseCategoryForm>({
		resolver: zodResolver(formSchemaCourseCategory),
		defaultValues: {
			categoryId: initialData?.categoryId || ""
		}
	});
	const {
		formState: { isSubmitting, isValid },
		handleSubmit
	} = form;

	const onSubmit = async (data: ICourseCategoryForm) => {
		try {
			await CourseApi.update({
				id: initialData?.id,
				userId: initialData?.userId,
				categoryId: data?.categoryId
			} as Course);
			toast.success("Category updated");
			router.refresh();
			setIsEditing(false);
		} catch {
			toast.error("Something went wrong");
		}
	};

	const selectedCategory = categories.find(
		(category) => category.value === initialData?.categoryId
	);

	return (
		<div className="border bg-slate-100 rounded-md p-4 flex flex-col gap-1">
			<div className="font-medium flex items-center justify-between">
				Course category
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
							Edit category
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
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Combobox
											options={categories}
											placeholderButton="Select category"
											placeholderInput="Search category..."
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
							Save
						</Button>
					</form>
				</Form>
			) : (
				<div className="text-sm text-slate-600">
					{selectedCategory?.label || "No category"}
				</div>
			)}
		</div>
	);
};
