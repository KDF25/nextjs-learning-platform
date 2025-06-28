"use client";

import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";

import { ENUM_PATH } from "@/shared/config";
import { cn } from "@/shared/lib";
import { useConfettiStore } from "@/shared/store";

import { useChapterChangeStatus } from "@/entities/chapter";

interface IVideoPlayerProps {
	chapterId: string;
	courseId: string;
	isLocked: boolean;
	completeOnEnd: boolean;
	playbackId?: string | null;
	title: string;
	nextChapterId?: string | null;
}

export const VideoPlayer: FC<IVideoPlayerProps> = ({
	chapterId,
	courseId,
	isLocked,
	completeOnEnd,
	playbackId,
	title,
	nextChapterId
}) => {
	const [isReady, setIsReady] = useState(false);
	const router = useRouter();
	const confetti = useConfettiStore();
	const { changeStatus } = useChapterChangeStatus();

	const handleOnEnd = () => {
		if (completeOnEnd) {
			changeStatus(courseId, chapterId, true).then(() => {
				if (!nextChapterId) {
					confetti.onOpen();
				}

				toast.success("Progress updated");
				router.refresh();

				if (nextChapterId) {
					router.push(
						ENUM_PATH.COURSES.CHAPTER(courseId, nextChapterId)
					);
				}
			});
		}
	};

	return (
		<div className="relative aspect-video">
			{!isReady && isLocked && (
				<div className="absolute inset-0   text-secondary flex items-center justify-center bg-slate-800">
					<Loader2 size={32} className=" animate-spin" />
				</div>
			)}

			{isLocked && (
				<div className="absolute inset-0 flex  text-secondary items-center justify-center bg-slate-800 flex-col gap-2">
					<Lock size={32} />
					<p className="text-sm">This chapter is locked</p>
				</div>
			)}
			{!isLocked && (
				<MuxPlayer
					title={title}
					className={cn(!isReady && "hidden")}
					playbackId={playbackId!}
					onCanPlay={() => setIsReady(true)}
					onEnded={handleOnEnd}
					autoPlay
				/>
			)}
		</div>
	);
};
