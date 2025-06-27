import { FC } from "react";

export const EmptyList: FC = () => {
	return (
		<div className="flex items-center justify-center">
			<p className="text-2xl text-slate-600   ">No courses found</p>
		</div>
	);
};
