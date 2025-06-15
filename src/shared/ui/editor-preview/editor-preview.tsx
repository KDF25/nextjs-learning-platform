"use client";

import dynamic from "next/dynamic";
import { FC, useMemo } from "react";
import "react-quill-new/dist/quill.bubble.css";

interface IEditorPreviewProps {
	value: string;
}

export const EditorPreview: FC<IEditorPreviewProps> = ({ value }) => {
	const ReactQuill = useMemo(
		() =>
			dynamic(() => import("react-quill-new"), {
				ssr: false
			}),
		[]
	);

	return <ReactQuill theme="bubble" value={value} readOnly />;
};
