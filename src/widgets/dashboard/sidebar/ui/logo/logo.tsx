"use client";

import Image from "next/image";
import { FC } from "react";

import { IMAGES } from "@/shared/assets";

export const Logo: FC = () => {
	return (
		<div className="flex flex-row items-center justify-center gap-2">
			<Image src={IMAGES.logo2} alt="logo" width={80} height={80} />
			<p className="text-xl text-sky-700 font-bold">Skill Forge</p>
		</div>
	);
};
