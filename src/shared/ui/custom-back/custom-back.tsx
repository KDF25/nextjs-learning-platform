"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ICustomBackProps {
	title: string;
	path: string;
}

export const CustomBack: FC<ICustomBackProps> = ({ title, path }) => {
	return (
		<Link
			href={path}
			className="flex items-center  hover:opacity-75 transition gap-x-2"
		>
			<ArrowLeft size={16} />
			<p className="text-sm">{title}</p>
		</Link>
	);
};
