"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";

import { ENUM_PATH } from "@/shared/config";
import { Button, CustomModal } from "@/shared/ui";

import { useCourseDelete } from "@/entities/course";

interface IDeleteChapterProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	courseId: string;
	onClickButton?: (isLoading: boolean) => void;
}

export const DeleteChapter: FC<IDeleteChapterProps> = ({
	courseId,
	onClickButton,
	...props
}) => {
	const { deleteChapter, isLoading } = useCourseDelete();
	const router = useRouter();

	const handleDelete = () => {
		deleteChapter(courseId)
			.then(() => {
				toast.success("Course deleted");
				router.push(ENUM_PATH.TEACHER.COURSES);
			})
			.catch(() => toast.error("Something went wrong"));
	};

	useEffect(() => {
		if (onClickButton) {
			onClickButton(isLoading);
		}
	}, [isLoading, onClickButton]);

	return (
		<CustomModal onConfirm={handleDelete}>
			<Button size={"sm"} {...props}>
				<Trash size={16} />
			</Button>
		</CustomModal>
	);
};
