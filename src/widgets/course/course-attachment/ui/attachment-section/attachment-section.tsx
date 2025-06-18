"use client";

import { Attachment, Course } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";

import { Button, FileUpload } from "@/shared/ui";

import { AttachmentFile, AttachmentService } from "@/entities/attachment";

import { DeleteAttachment } from "@/features/attachment";

interface IAttachmentSectionProps {
	initialData: Course & { attachments: Attachment[] };
}

export const AttachmentSection: FC<IAttachmentSectionProps> = ({
	initialData
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const router = useRouter();

	const onSubmit = async (data: { url: string; name: string }) => {
		try {
			await AttachmentService.add({
				id: initialData?.id,
				userId: initialData?.userId,
				url: data?.url,
				name: data?.name
			});
			toast.success("Attachment added");
			router.refresh();
			setIsEditing(false);
		} catch {
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="border bg-slate-100 rounded-md p-4 flex flex-col gap-1">
			<div className="font-medium flex items-center justify-between">
				Course attachment
				<Button
					variant={"ghost"}
					className="flex flex-row gap-1"
					onClick={() => setIsEditing(!isEditing)}
				>
					{isEditing && <>Cancel</>}

					{!isEditing && (
						<>
							<PlusCircle size={12} />
							Add a file
						</>
					)}
				</Button>
			</div>

			{!isEditing && (
				<>
					{initialData?.attachments?.length === 0 && (
						<p className="text-sm text-slate-600">
							No attachments yet
						</p>
					)}
					{initialData?.attachments?.length > 0 && (
						<div className="flex flex-col gap-2">
							{initialData?.attachments?.map((attachment) => (
								<AttachmentFile
									key={attachment.id}
									attachment={attachment}
									DeleteAttachment={
										<DeleteAttachment
											courseId={initialData.id}
											attachmentId={attachment.id}
										/>
									}
								/>
							))}
						</div>
					)}
				</>
			)}

			{isEditing && (
				<div className="flex flex-col gap-2">
					<FileUpload
						endpoint="courseAttachment"
						onChange={(data) => {
							if (data?.url) {
								onSubmit({
									url: data?.url,
									name:
										data?.name ||
										`${data?.url.split("/").pop()}`
								});
							}
						}}
					/>
					<div className="text-xs text-muted-foreground">
						Add anything you think is relevant to the course
					</div>
				</div>
			)}
		</div>
	);
};
