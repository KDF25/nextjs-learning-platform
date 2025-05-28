"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";

import { ChangeMode } from "../change-mode";
import { Logout } from "../logout";

export const NavbarRoutes: FC = ({}) => {
	const pathname = usePathname();
	// const router = useRouter();

	const isTeacherPage = pathname?.startsWith(ENUM_PATH.TEACHER_PATHS);
	const isPlayerPage = pathname?.includes(ENUM_PATH.PLAYER_PATHS);

	return (
		<div className="flex gap-x-2 ml-auto">
			{isTeacherPage || isPlayerPage ? <Logout /> : <ChangeMode />}
			<UserButton />
		</div>
	);
};
