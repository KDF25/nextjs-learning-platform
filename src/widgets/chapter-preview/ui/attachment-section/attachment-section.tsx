import { Attachment } from "@prisma/client";
import { File } from "lucide-react";
import { FC } from "react";

interface IAttachmentSectionProps {
	attachments: Attachment[];
}

export const AttachmentSection: FC<IAttachmentSectionProps> = ({
	attachments
}) => {
	return (
		<div className="p-4">
			{attachments?.map((attachment) => (
				<a
					key={attachment?.id}
					href={attachment?.url}
					target="_blank"
					className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md flex-row gap-2"
				>
					<File size={16} className="flex-shrink-0" />
					<p className="text-xs line-clamp-1">
						{attachment?.name || "File name"}
					</p>
				</a>
			))}
		</div>
	);
};
