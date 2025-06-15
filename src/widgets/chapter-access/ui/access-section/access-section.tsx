"use client";

import { Chapter } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
	Button,
	Checkbox,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem
} from "@/shared/ui";

import { ChapterService } from "@/entities/chapter";

interface IAccessSectionProps {
	initialData: Chapter;
	courseId: string;
}

type IForm = Pick<Chapter, "isFree">;

export const AccessSection: FC<IAccessSectionProps> = ({
	initialData,
	courseId
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const router = useRouter();
	const form = useForm<IForm>({
		defaultValues: {
			isFree: !!initialData?.isFree
		}
	});
	const {
		formState: { isSubmitting, isValid },
		handleSubmit
	} = form;

	const onSubmit = async (data: IForm) => {
		try {
			await ChapterService.update(courseId, {
				id: initialData?.id,
				isFree: data?.isFree
			} as Chapter);
			toast.success("Access updated");
			router.refresh();
			setIsEditing(false);
		} catch {
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="border bg-slate-100 rounded-md p-4 flex flex-col gap-1">
			<div className="font-medium flex items-center justify-between">
				Chapter access
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
							Edit access
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
							name="isFree"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormDescription>
											Check this box if you want to make
											this chapter free
										</FormDescription>
									</div>
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
				<div className="text-sm text-slate-600 italic">
					{initialData.isFree ? (
						<>This chapter is free</>
					) : (
						<>This chapter is not free</>
					)}
				</div>
			)}
		</div>
	);
};
