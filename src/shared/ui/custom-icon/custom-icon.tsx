import { type VariantProps, cva } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import { FC } from "react";

import { cn } from "@/shared/lib";

const backgroundVariants = cva(
	"rounded-full flex items-center justify-center",
	{
		variants: {
			variant: {
				default: "bg-sky-100",
				success: "bg-emerald-100"
			},
			size: {
				default: "p-2",
				sm: "p-1"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	}
);

const iconVariants = cva("", {
	variants: {
		variant: {
			default: "text-sky-700",
			success: "text-emerald-700"
		},
		size: {
			default: "h-6 w-6",
			sm: "h-4 w-4"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});

export interface ICustomIconProps
	extends VariantProps<typeof backgroundVariants>,
		VariantProps<typeof iconVariants> {
	icon: LucideIcon;
}

export const CustomIcon: FC<ICustomIconProps> = ({
	icon: Icon,
	variant,
	size
}) => {
	return (
		<div className={cn(backgroundVariants({ variant, size }))}>
			<Icon className={cn(iconVariants({ variant, size }))} />
		</div>
	);
};
