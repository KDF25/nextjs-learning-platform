"use client";

import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";

import { AttachmentService } from "@/entities/attachment";

interface IDeleteAttachmentProps {
	courseId: string;
	attachmentId: string;
}

export const DeleteAttachment: FC<IDeleteAttachmentProps> = ({
	courseId,
	attachmentId
}) => {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const handleDelete = async () => {
		try {
			setIsDeleting(true);
			await AttachmentService.delete(courseId, attachmentId);
			toast.success("Attachment deleted");
			router.refresh();
		} catch {
			toast.error("Something went wrong");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="flex items-center ml-auto">
			{isDeleting ? (
				<Loader2 size={16} className="animate-spin" />
			) : (
				<button
					onClick={handleDelete}
					className="flex items-center hover:opacity-75 transition"
				>
					<X size={16} />
				</button>
			)}
		</div>
	);
};
