import { VariantProps, cva } from "class-variance-authority";
import { FC } from "react";

import { Progress } from "../shadcn-ui";

const backgroundVariants = cva("flex flex-col gap-2", {
	variants: {
		variant: {
			default: "text-sky-700",
			success: "text-emerald-700"
		},
		size: {
			default: "text-sm",
			sm: "text-xs"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});

interface ICustomProgressProps extends VariantProps<typeof backgroundVariants> {
	progress: number;
}

export const CustomProgress: FC<ICustomProgressProps> = ({
	progress,
	variant,
	size
}) => {
	return (
		<div className="flex flex-col gap-2">
			<Progress value={progress} className="h-2" variant={variant} />
			<p className={backgroundVariants({ variant, size })}>
				{Math.round(progress)}% completed
			</p>
		</div>
	);
};
