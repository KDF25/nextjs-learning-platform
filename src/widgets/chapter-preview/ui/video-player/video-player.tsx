"use client";

import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import { FC, useState } from "react";

import { cn } from "@/shared/lib";

interface IVideoPlayerProps {
	chapterId: string;
	courseId: string;
	isLocked: boolean;
	completeOnEnd: boolean;
	playbackId?: string | null;
	title: string;
}

export const VideoPlayer: FC<IVideoPlayerProps> = ({
	// chapterId,
	// courseId,
	isLocked,
	// completeOnEnd,
	playbackId,
	title
}) => {
	const [isReady, setIsReady] = useState(false);

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
					onEnded={() => {}}
					autoPlay
				/>
			)}
		</div>
	);
};
