import { FC } from "react";

import { Navbar, Sidebar } from "@/widgets/dashboard";

interface LayoutProps {
	children?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<div className="h-full">
			<div className="h-[80px] md:pl-60 fixed inset-y-0 w-full z-50">
				<Navbar />
			</div>
			<div className="hidden md:flex h-full w-60 flex-col fixed inset-y-0 z-50 ">
				<Sidebar />
			</div>
			<main className="md:pl-60 h-full">{children}</main>
		</div>
	);
};

export default Layout;
