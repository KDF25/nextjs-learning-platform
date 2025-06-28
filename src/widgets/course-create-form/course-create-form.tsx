"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { ENUM_PATH } from "@/shared/config";
import {
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from "@/shared/ui";

import {
	CourseApi,
	ICourseTitleForm,
	formSchemaCourseTitle
} from "@/entities/course";

export const CourseCreateForm: FC = ({}) => {
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
			const course = await CourseApi.create(data);
			router.push(ENUM_PATH.TEACHER.COURSE(course.id));
		} catch {
			toast.error("Failed to create course. Please try again.");
		}
	};

	return (
		<div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
			<div>
				<h1 className="text-2xl">Name your course</h1>
				<p className="text-sm text-slate-600">
					Give your course a descriptive name that reflects its
					content and purpose.
				</p>
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-8 mt-8"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Course Title</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. Introduction to React"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										What will you teach in this course?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-x-2">
							<Link href={ENUM_PATH.MAIN}>
								<Button type="button" variant={"ghost"}>
									Cancel
								</Button>
							</Link>
							<Button
								disabled={!isValid || isSubmitting}
								type="submit"
							>
								Continue
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};
