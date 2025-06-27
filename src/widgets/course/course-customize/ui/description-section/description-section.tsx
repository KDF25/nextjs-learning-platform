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
	Textarea
} from "@/shared/ui";

import {
	CourseApi,
	ICourseDescriptionForm,
	formSchemaCourseDescription
} from "@/entities/course";

interface IDescriptionSectionProps {
	initialData: Course;
}

export const DescriptionSection: FC<IDescriptionSectionProps> = ({
	initialData
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const router = useRouter();
	const form = useForm<ICourseDescriptionForm>({
		resolver: zodResolver(formSchemaCourseDescription),
		defaultValues: {
			description: initialData?.description || ""
		}
	});
	const {
		formState: { isSubmitting, isValid },
		handleSubmit
	} = form;

	const onSubmit = async (data: ICourseDescriptionForm) => {
		try {
			await CourseApi.update({
				id: initialData?.id,
				userId: initialData?.userId,
				description: data?.description
			} as Course);
			toast.success("Description updated");
			router.refresh();
			setIsEditing(false);
		} catch {
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="border bg-slate-100 rounded-md p-4 flex flex-col gap-1">
			<div className="font-medium flex items-center justify-between">
				Course description
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
							Edit description
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
							name="description"
							render={({ field }) => (
								<FormItem className="bg-white">
									<FormControl>
										<Textarea
											disabled={isSubmitting}
											placeholder="e.g. This course is about..."
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
								initialData.description ===
									form.getValues("description")
							}
							type="submit"
						>
							Save
						</Button>
					</form>
				</Form>
			) : (
				<div className="text-sm text-slate-600">
					{initialData?.description || "No description"}
				</div>
			)}
		</div>
	);
};
