"use client";

import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";

import { Button } from "@/shared/ui";

import { useCoursePublish, useCourseUnpublish } from "@/entities/course";

interface IChangePublishProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	courseId: string;
	isPublished?: boolean;
	isComplete?: boolean;
	onClickButton?: (isLoading: boolean) => void;
}

export const ChangePublish: FC<IChangePublishProps> = ({
	courseId,
	isPublished,
	isComplete,
	onClickButton,
	...props
}) => {
	const { publish, isLoading: isLoadingPublish } = useCoursePublish();
	const { unpublish, isLoading: isLoadingUnpublish } = useCourseUnpublish();
	const router = useRouter();

	const handleUpdate = () => {
		if (!isComplete) {
			toast.error("Complete all fields to publish course");
			return;
		}

		if (isPublished) {
			unpublish(courseId)
				.then(() => {
					toast.success("Course unpublished");
					router.refresh();
				})
				.catch(() => toast.error("Something went wrong"));
			return;
		} else {
			publish(courseId)
				.then(() => {
					toast.success("Course published");
					router.refresh();
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
