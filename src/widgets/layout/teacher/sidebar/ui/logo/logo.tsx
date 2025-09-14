import Link from "next/link";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";

export const Logo: FC = () => {
	return (
		<Link href={ENUM_PATH.TEACHER.COURSES}>
			<div className="flex flex-row items-center justify-center gap-2">
				<div className="w-10 h-10 bg-sky-700 rounded-lg flex items-center justify-center p-4">
					<span className="text-white font-bold text-xl">N</span>
				</div>
				<p className="text-xl text-sky-700 font-bold">Nexus</p>
			</div>
		</Link>
	);
};
