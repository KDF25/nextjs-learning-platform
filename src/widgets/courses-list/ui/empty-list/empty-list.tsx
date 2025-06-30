import Image from "next/image";
import { FC } from "react";

import { IMAGES } from "@/shared/assets";

export const EmptyList: FC = () => {
	return (
		<div className="flex items-center justify-center justify-self-center flex-col gap-2 p-8">
			<Image
				src={IMAGES.no_result}
				alt="no result"
				width={150}
				height={150}
			/>
			<p className="text-2xl text-slate-600">No courses found</p>
		</div>
	);
};
