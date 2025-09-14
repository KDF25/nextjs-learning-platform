import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FC } from "react";

import { ENUM_PATH } from "@/shared/config";
import "@/shared/styles/globals.css";
import { CustomBackground } from "@/shared/ui";

import { Navbar, Sidebar } from "@/widgets/layout";

interface LayoutProps {
	children?: React.ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
	const { userId } = await auth();

	if (!userId) {
		redirect(ENUM_PATH.MAIN);
	}

	return (
		<div className="h-full">
			<div className="h-[80px] md:pl-60 fixed inset-y-0 w-full z-50">
				<Navbar />
			</div>
			<div className="hidden md:flex h-full w-60 flex-col fixed inset-y-0 z-50 ">
				<Sidebar />
			</div>
			<div className="min-h-screen w-full relative">
				<CustomBackground />
				<main className="md:pl-60 pt-[80px] h-full ">{children}</main>
			</div>
		</div>
	);
};

export default Layout;
