import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { IMAGES } from "@/shared/assets";
import "@/shared/styles/globals.css";

import Providers from "@/app/__providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "Nexus | Online Learning Platform",
	description:
		"Nexus is your ultimate platform for mastering new skills. Explore a wide range of expert-led courses and enhance your career with flexible online learning.",
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ""),
	openGraph: {
		title: "Nexus",
		description:
			"Nexus offers high-quality courses across various domains, from tech to business and personal development. Learn at your own pace and unlock new career opportunities.",
		url: process.env.NEXT_PUBLIC_APP_URL,
		siteName: "Nexus",
		images: [
			{
				url: IMAGES.logo.src,
				width: 800,
				height: 600,
				alt: "Nexus | Online Learning Platform"
			}
		],
		locale: "en-US",
		type: "website"
	},
	icons: {
		icon: "/icons/icon-512.png"
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Providers>
			<html lang="en" prefix="og: http://ogp.me/ns#">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					{children}
				</body>
			</html>
		</Providers>
	);
}
