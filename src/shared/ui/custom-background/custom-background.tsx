import { FC } from "react";

export const CustomBackground: FC = ({}) => {
	return (
		<div
			className="absolute inset-0"
			style={{
				background: `
					radial-gradient(ellipse 80% 60% at 70% 20%, rgba(80, 140, 255, 0.6), transparent 68%),
					radial-gradient(ellipse 70% 60% at 20% 80%, rgba(100, 200, 255, 0.4), transparent 68%),
					radial-gradient(ellipse 60% 50% at 60% 65%, rgba(200, 230, 255, 0.8), transparent 68%),
					radial-gradient(ellipse 65% 40% at 50% 60%, rgba(240, 250, 255, 0.9), transparent 68%),
					linear-gradient(180deg, #fdfdff 0%, #f1f6ff 100%)
				`,
				zIndex: -1
			}}
		/>
	);
};
