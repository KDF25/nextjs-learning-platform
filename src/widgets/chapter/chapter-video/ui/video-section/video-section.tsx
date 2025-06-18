"use client";

import MuxPlayer from "@mux/mux-player-react";
import { Chapter, MuxData } from "@prisma/client";
import { PlusCircle, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";

import { Button, FileUpload } from "@/shared/ui";

import { ChapterService } from "@/entities/chapter";

interface IVideoSectionProps {
	initialData: Chapter & { muxData?: MuxData };
	courseId: string;
}

type IForm = Pick<Chapter, "videoUrl">;

export const VideoSection: FC<IVideoSectionProps> = ({
	initialData,
	courseId
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const router = useRouter();

	const onSubmit = async (data: IForm) => {
		try {
			await ChapterService.update(courseId, {
				id: initialData?.id,
				videoUrl: data?.videoUrl
			} as Chapter);
			toast.success("Access updated");
			router.refresh();
			setIsEditing(false);
		} catch {
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="border bg-slate-100 rounded-md p-4 flex flex-col gap-1">
			<div className="font-medium flex items-center justify-between">
				Chapter video
				<Button
					variant={"ghost"}
					className="flex flex-row gap-1"
					onClick={() => setIsEditing(!isEditing)}
				>
					{isEditing && <>Cancel</>}

					{!isEditing && !initialData?.videoUrl && (
						<>
							<PlusCircle size={12} />
							Add a video
						</>
					)}

					{!isEditing && initialData?.videoUrl && (
						<>
							<PlusCircle size={12} />
							Edit video
						</>
					)}
				</Button>
			</div>
			{!isEditing &&
				(!initialData?.videoUrl ? (
					<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
						<Video size={40} />
					</div>
				) : (
					<div className="relative aspect-video ">
						<MuxPlayer
							playbackId={initialData?.muxData?.playbackId || ""}
						/>
					</div>
				))}

			{isEditing && (
				<div className="flex flex-col gap-2">
					<FileUpload
						endpoint="chapterVideo"
						onChange={(data) => {
							if (data?.url) {
								onSubmit({
									videoUrl: data?.url
								});
							}
						}}
					/>
					<p className="text-xs text-muted-foreground">
						Upload this video to be available in the chapter
					</p>
				</div>
			)}
			{initialData?.videoUrl && !isEditing && (
				<p className="text-xs text-muted-foreground">
					Video can take a few minutes to process. Refresh the page if
					you don&apos;t see the video
				</p>
			)}
		</div>
	);
};
