"use client";

import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";

import { useConfettiStore } from "@/shared/store";
import { Button } from "@/shared/ui";

import { useChapterPublish, useChapterUnpublish } from "@/entities/chapter";

interface IChangePublishProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	courseId: string;
	isPublished?: boolean;
	isComplete?: boolean;
	chapterId: string;
	onClickButton?: (isLoading: boolean) => void;
}

export const ChangePublish: FC<IChangePublishProps> = ({
	courseId,
	isPublished,
	isComplete,
	chapterId,
	onClickButton,
	...props
}) => {
	const { publish, isLoading: isLoadingPublish } = useChapterPublish();
	const { unpublish, isLoading: isLoadingUnpublish } = useChapterUnpublish();
	const router = useRouter();
	const confetti = useConfettiStore();

	const handleUpdate = () => {
		if (!isComplete) {
			toast.error("Complete all fields to publish chapter");
			return;
		}

		if (isPublished) {
			unpublish(courseId, chapterId)
				.then(() => {
					toast.success("Chapter unpublished");
					router.refresh();
				})
				.catch(() => toast.error("Something went wrong"));
			return;
		} else {
			publish(courseId, chapterId)
				.then(() => {
					toast.success("Chapter published");
					router.refresh();
					confetti.onOpen();
				})
				.catch(() => toast.error("Something went wrong"));
		}
	};

	useEffect(() => {
		if (onClickButton) {
			if (isPublished) {
				onClickButton(isLoadingUnpublish);
			} else {
				onClickButton(isLoadingPublish);
			}
		}
	}, [isLoadingPublish, isLoadingUnpublish, onClickButton, isPublished]);

	return (
		<Button
			variant={"outline"}
			size={"sm"}
			onClick={handleUpdate}
			{...props}
		>
			{isPublished ? "Unpublish" : "Publish"}
		</Button>
	);
};
