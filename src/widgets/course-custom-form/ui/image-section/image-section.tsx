"use client";

import { Course } from "@prisma/client";
import { ImageIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";

import { Button, FileUpload } from "@/shared/ui";

import { CourseService, ICourseCustomForm } from "@/entities/course";

interface IImageSectionProps {
	initialData: Course;
}

export const ImageSection: FC<IImageSectionProps> = ({ initialData }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const router = useRouter();

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
					{isEditing && <>Cancel</>}

					{!isEditing && !initialData?.imageUrl && (
						<>
							<PlusCircle size={12} />
							Add an image
						</>
					)}

					{!isEditing && initialData?.imageUrl && (
						<>
							<PlusCircle size={12} />
							Edit image
						</>
					)}
				</Button>
			</div>

			{!isEditing &&
				(!initialData?.imageUrl ? (
					<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
						<ImageIcon size={40} />
					</div>
				) : (
					<div className="relative aspect-video">
						<Image
							alt="Upload"
							fill
							className="object-cover"
							src={initialData?.imageUrl}
						/>
					</div>
				))}

			{isEditing && (
				<div className="flex flex-col gap-2">
					<FileUpload
						endpoint="courseImage"
						onChange={(url) => {
							if (url) {
								onSubmit({
									imageUrl: url
								} as ICourseCustomForm);
							}
						}}
					/>
					<div className="text-xs text-muted-foreground">
						16:9 aspect ratio recommended
					</div>
				</div>
			)}
		</div>
	);
};
