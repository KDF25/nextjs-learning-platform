"use client";

import dynamic from "next/dynamic";
import { FC, useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

interface IEditorProps {
	onChange: (value: string) => void;
	value: string;
}

export const Editor: FC<IEditorProps> = ({ onChange, value }) => {
	const ReactQuill = useMemo(
		() =>
			dynamic(() => import("react-quill-new"), {
				ssr: false
			}),
		[]
	);

	return (
		<div className="bg-white">
			<ReactQuill theme="snow" value={value} onChange={onChange} />
		</div>
	);
};
