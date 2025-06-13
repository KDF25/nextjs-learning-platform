"use client";

import { FC } from "react";
import toast from "react-hot-toast";
import { UploadedFileData } from "uploadthing/types";

import { ourFileRouter } from "@/app/api/uploadthing/core";

import { UploadDropzone } from "./uploadthing";

interface IFileUploadProps {
	onChange: (data?: UploadedFileData) => void;
	endpoint: keyof typeof ourFileRouter;
}

export const FileUpload: FC<IFileUploadProps> = ({ onChange, endpoint }) => {
	return (
		<UploadDropzone
			endpoint={endpoint}
			onClientUploadComplete={(res) => {
				onChange(res?.[0]);
			}}
			onUploadError={(error: Error) => {
				toast.error(`${error.message}`);
			}}
		/>
	);
};
