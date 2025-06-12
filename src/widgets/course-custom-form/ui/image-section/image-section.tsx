"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import { PlusCircle } from "lucide-react";
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
	ICourseCustomForm,
	formSchemaCourseCustom
} from "@/entities/course";

interface IImageSectionProps {
	initialData: Course;
}

export const ImageSection: FC<IImageSectionProps> = ({ initialData }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const router = useRouter();
	const form = useForm<ICourseCustomForm>({
		resolver: zodResolver(formSchemaCourseCustom),
		defaultValues: {
			imageUrl: initialData?.imageUrl || ""
		}
	});
	const {
		formState: { isSubmitting, isValid },
		handleSubmit
	} = form;

	const onSubmit = async (data: ICourseCustomForm) => {
		try {
			await CourseService.update({
				id: initialData?.id,
				userId: initialData?.userId,
				imageUrl: data?.imageUrl
			} as Course);
			router.refresh();
			setIsEditing(false);
		} catch {
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="border bg-slate-100 rounded-md p-4 flex flex-col gap-1">
			<div className="font-medium flex items-center justify-between">
				Course image
				<Button
					variant={"ghost"}
					className="flex flex-row gap-1"
					onClick={() => setIsEditing(!isEditing)}
				>
					{isEditing ? (
						<>Cancel</>
					) : (
						<>
							<PlusCircle size={12} />
							Add an image
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
							name="imageUrl"
							render={({ field }) => (
								<FormItem className="bg-white">
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. This course is about..."
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-2">
							<Button
								disabled={
									!isValid ||
									isSubmitting ||
									initialData.description ===
										form.getValues("imageUrl")
								}
								type="submit"
							>
								Save
							</Button>
						</div>
					</form>
				</Form>
			) : (
				<div className="text-sm text-slate-600">
					{initialData?.imageUrl || "No image"}
				</div>
			)}
		</div>
	);
};
