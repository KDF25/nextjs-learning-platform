"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";

import { ENUM_PATH } from "@/shared/config";
import { useConfettiStore } from "@/shared/store";
import { Button } from "@/shared/ui";

import { useChapterChangeStatus } from "@/entities/chapter";

interface IChangeProgressCourseProps {
	chapterId: string;
	courseId: string;
	nextChapterId: string;
	isCompleted: boolean;
}

export const ChangeProgressCourse: FC<IChangeProgressCourseProps> = ({
	chapterId,
	courseId,
	nextChapterId,
	isCompleted
}) => {
	const router = useRouter();
	const confetti = useConfettiStore();
	const Icon = isCompleted ? XCircle : CheckCircle;
	const { changeStatus, isLoading } = useChapterChangeStatus();

	const handleChange = async () => {
		changeStatus(courseId, chapterId, !isCompleted)
			.then(() => {
				if (!nextChapterId) {
					confetti.onOpen();
				} else if (!isCompleted) {
					router.push(
						ENUM_PATH.COURSES.CHAPTER(courseId, nextChapterId)
					);
				}
				toast.success("Status updated");
				router.refresh();
			})
			.catch(() => {
				toast.error("Something went wrong");
			});
	};

	return (
		<Button
			variant={isCompleted ? "outline" : "success"}
			className="w-full md:w-auto"
			onClick={handleChange}
			disabled={isLoading}
		>
			{isCompleted ? "Not completed" : "Mark as completed"}
			<Icon size={16} className="ml-2" />
		</Button>
	);
};
