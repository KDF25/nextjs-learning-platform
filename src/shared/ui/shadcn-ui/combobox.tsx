"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/lib";

import { Button } from "./button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface IComboboxProps {
	options: { value: string; label: string }[];
	value: string;
	placeholderButton?: string;
	placeholderInput?: string;
	onChange: (value: string) => void;
}

export const Combobox: React.FC<IComboboxProps> = ({
	options,
	value,
	placeholderButton,
	placeholderInput,
	onChange
}) => {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value
						? options.find((option) => option.value === value)
								?.label
						: placeholderButton || "Select options..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-[var(--radix-popper-anchor-width)]  p-0"
				align="start"
			>
				<Command>
					<CommandInput
						placeholder={placeholderInput || "Search option..."}
						className="h-9"
					/>
					<CommandList>
						<CommandEmpty>No option found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={() => {
										onChange(
											option.value === value
												? ""
												: option.value
										);
										setOpen(false);
									}}
								>
									{option.label}
									<Check
										className={cn(
											"ml-auto",
											value === option.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
