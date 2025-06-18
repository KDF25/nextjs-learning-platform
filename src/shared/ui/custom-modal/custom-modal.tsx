"use client";

import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { FC } from "react";

import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "../shadcn-ui";

interface ICustomModalProps {
	children: React.ReactNode;
	onConfirm: () => void;
}

export const CustomModal: FC<ICustomModalProps> = ({ children, onConfirm }) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you Sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
