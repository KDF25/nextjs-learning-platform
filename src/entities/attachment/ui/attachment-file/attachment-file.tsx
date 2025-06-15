"use client";

import { Attachment } from "@prisma/client";
import { File } from "lucide-react";
import { FC } from "react";

interface IAttachmentFileProps {
	attachment: Attachment;
	DeleteAttachment: React.ReactNode;
}

export const AttachmentFile: FC<IAttachmentFileProps> = ({
	attachment,
	DeleteAttachment
}) => {
	return (
		<div className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md flex-row gap-2">
			<File size={16} className="flex-shrink-0" />
			<p className="text-xs line-clamp-1">
				{attachment?.name || "File name"}
			</p>
			{DeleteAttachment}
		</div>
	);
};
