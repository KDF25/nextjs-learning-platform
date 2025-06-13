"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { formatPrice } from "@/shared/lib";
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
	ICoursePriceForm,
	formSchemaCoursePrice
} from "@/entities/course";

interface IPriceSectionProps {
	initialData: Course;
}

export const PriceSection: FC<IPriceSectionProps> = ({ initialData }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const router = useRouter();
	const form = useForm<ICoursePriceForm>({
		resolver: zodResolver(formSchemaCoursePrice),
		defaultValues: {
			price: initialData?.price || 0
		}
	});
	const {
		formState: { isSubmitting, isValid },
		handleSubmit
	} = form;

	const onSubmit = async (data: ICoursePriceForm) => {
		try {
			await CourseService.update({
				id: initialData?.id,
				userId: initialData?.userId,
				price: data?.price
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
				Course price
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
							Edit price
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
							name="price"
							render={({ field }) => (
								<FormItem className="bg-white">
									<FormControl>
										<Input
											disabled={isSubmitting}
											type="number"
											step="0.01"
											placeholder="Set a price for your course"
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
									initialData.price ===
										form.getValues("price")
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
					{initialData.price
						? formatPrice(initialData.price)
						: "No price"}
				</div>
			)}
		</div>
	);
};
