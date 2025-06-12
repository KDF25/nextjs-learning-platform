import { auth } from "@clerk/nextjs/server";
import { type FileRouter, createUploadthing } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthorized");
	return { userId };
};

export const ourFileRouter = {
	courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(() => handleAuth())
		.onUploadComplete(() => {}),

	courseAttachment: f(["text", "image", "video", "audio", "pdf"])
		.middleware(() => handleAuth())
		.onUploadComplete(() => {}),

	chapterVideo: f({ video: { maxFileSize: "128MB", maxFileCount: 1 } })
		.middleware(() => handleAuth())
		.onUploadComplete(() => {})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
