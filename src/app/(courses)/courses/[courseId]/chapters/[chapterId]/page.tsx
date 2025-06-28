import { FC } from "react";

interface IChapterIdProps {
	params: Promise<{ courseId: string; chapterId: string }>;
}

const ChapterId: FC<IChapterIdProps> = ({}) => {
	return (
		<div>
			<p>ChapterId</p>
		</div>
	);
};

export default ChapterId;
