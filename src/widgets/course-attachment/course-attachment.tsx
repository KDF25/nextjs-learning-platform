"use client";

import { Attachment, Course } from "@prisma/client";
import { Files } from "lucide-react";
import { FC } from "react";

import { CustomIcon } from "@/shared/ui";

import { AttachmentSection } from "./ui";

interface ICourseAttachmentFormProps {
	course: Course & { attachments: Attachment[] };
}

export const CourseAttachment: FC<ICourseAttachmentFormProps> = ({
	course
}) => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-x-2">
				<CustomIcon icon={Files} />
				<h2 className="text-xl font-semibold">
					Resources & Attachments
				</h2>
			</div>

			<AttachmentSection initialData={course} />
		</div>
	);
};
