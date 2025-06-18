"use client";

import { VariantProps, cva } from "class-variance-authority";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { FC } from "react";

import { cn } from "@/shared/lib";

const bannerVariants = cva(
	"border text-center p-4 text-sm flex items-center w-full",
	{
		variants: {
			variant: {
				warning: "bg-yellow-200/80 border-yellow-30 text-primary",
				success: "bg-emerald-200/80 border-emerald-800 text-secondary"
			}
		},
		defaultVariants: {
			variant: "warning"
		}
	}
);

const iconMap = {
	warning: AlertTriangle,
	success: CheckCircleIcon
};

interface IBannerProps extends VariantProps<typeof bannerVariants> {
	label: string;
}

export const Banner: FC<IBannerProps> = ({ label, variant }) => {
	const Icon = iconMap[variant || "warning"];
	return (
		<div className={cn(bannerVariants({ variant }))}>
			<Icon size={20} className="mr-2" />
			{label}
		</div>
	);
};
