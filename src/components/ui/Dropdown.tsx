"use client";
import Button from "./Button";
import classNames from "classnames";
import { useToggle } from "@/hooks/useToggle";
import { createContext, useRef } from "react";
import { MoreVertical, type LucideIcon } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";

//
// Dropdown context
const DropdownContext = createContext<{
	open?: boolean;
	toggle?: () => void;
} | null>(null);

type MainProps<T extends React.ElementType> = {
	as?: T;
	icon?: LucideIcon;
	label?: string;
}; // main props

type ItemProps<T extends React.ElementType> = {
	as?: T;
	iconStart?: LucideIcon;
	iconEnd?: LucideIcon;
	label?: string;
};

export type DropdownProps<T extends React.ElementType> =
	React.PropsWithChildren<MainProps<T>> &
		Omit<React.ComponentPropsWithRef<T>["ref"], keyof MainProps<T>>;
function Dropdown<T extends React.ElementType = "div">({
	as,
	children,
	icon = MoreVertical,
	label,
	...rest
}: DropdownProps<T>) {
	const { open, handleToggle, handleClose } = useToggle();
	const Component = as || "div";

	const dropRef = useRef<HTMLDivElement>(null);
	useClickOutside<HTMLDivElement>(dropRef, handleClose);

	const Icon = icon!;
	return (
		<DropdownContext.Provider value={{ open, toggle: handleToggle }}>
			<Component
				ref={dropRef}
				className={classNames(open && "open", "relative text-right")}
				{...rest}>
				<button onClick={handleToggle} className="">
					{icon! && <Icon size={16} />} {label}
				</button>
				<div
					className={classNames(
						"before:contents['']   absolute -right-5 w-40 rounded-md border border-slate-100/80 bg-white p-4 shadow-sm before:absolute before:-top-2 before:right-5 before:border-b-8 before:border-l-8 before:border-r-8 before:border-b-slate-500 before:border-l-transparent before:border-r-transparent",
						!open && "collapse",
					)}>
					{children}
				</div>
			</Component>
		</DropdownContext.Provider>
	);
}

export type DropdownItemProps<T extends React.ElementType> =
	React.PropsWithChildren<ItemProps<T>> &
		Omit<React.ComponentPropsWithRef<T>["ref"], keyof ItemProps<T>>;

/**
 * Dropdown item
 * @param param0
 * @returns
 */
function DropdownItem<T extends React.ElementType>({
	as,
	children,
	className,
	iconStart,
	iconEnd,
	label,
	...rest
}: DropdownItemProps<T>) {
	const Component = as || Button;
	const StartIcon = iconStart!;
	const EndIcon = iconEnd!;

	return (
		<Component
			className={classNames(
				"flex w-full items-center rounded-md p-2 text-xs hover:bg-slate-100",
				className,
			)}
			{...rest}>
			{iconStart && <StartIcon size={14} className="mr-2" />}
			{children ? children : label}
			{iconEnd && <EndIcon size={14} className="ml-2" />}
		</Component>
	);
}

export default Object.assign(Dropdown, {
	Item: DropdownItem,
});

// type DProps<T extends React.ElementType> = {
// 	as?: T;
// 	icon?: LucideIcon;
// };

// type ItemProps<T extends React.ElementType> = {
// 	as?: T;
// 	iconStart?: LucideIcon;
// 	iconEnd?: LucideIcon;
// 	label?: string;
// };

// export type DropdownProps<T extends React.ElementType> =
// 	React.PropsWithChildren<DProps<T>> &
// 		Omit<React.ComponentPropsWithRef<T>["ref"], keyof ItemProps<T>> & {
// 			icon?: LucideIcon;
// 		};

// export type DropdownItemProps<T extends React.ElementType> =
// 	React.PropsWithChildren<ItemProps<T>> &
// 		Omit<React.ComponentPropsWithoutRef<T>, keyof ItemProps<T>> & {};

// const DropdownContext = createContext<{
// 	open?: boolean;
// 	toggle?: () => void;
// } | null>(null);

// /**
//  * Dropdown
//  * @param param0
//  * @returns
//  */
// function DropdownComponent<T extends React.ElementType>({
// 	as,
// 	children,

// 	icon = MoreVertical,
// }: DropdownProps<T>) {
// 	const { open, handleClose, handleToggle } = useToggle();
// 	const Component = as || "div";
// 	const Icon = icon!;

// 	const dropRef = useRef<HTMLDivElement>(null);
// 	useClickOutside<HTMLDivElement>(dropRef, handleClose);

// 	return (
// 		<DropdownContext.Provider value={{ open, toggle: handleToggle }}>
// 			<Component
// 				ref={dropRef}
// 				className={classNames(open && "open", "relative text-right")}>
// 				<button onClick={handleToggle} className="">
// 					{icon! && <Icon size={16} />}
// 				</button>
// 				<div
// 					className={classNames(
// 						"absolute right-0 w-40 rounded-b-md bg-white p-4 shadow-sm",
// 						!open && "collapse",
// 					)}>
// 					{children}
// 				</div>
// 			</Component>
// 		</DropdownContext.Provider>
// 	);
// }
// const Dropdown = DropdownComponent;
// /**
//  * Dropdown item
//  * @param param0
//  * @returns
//  */
// function DropdownItem<T extends React.ElementType>({
// 	as,
// 	children,
// 	className,
// 	iconStart,
// 	iconEnd,
// 	label,
// 	...rest
// }: DropdownItemProps<T>) {
// 	const Component = as || Button;
// 	const StartIcon = iconStart!;
// 	const EndIcon = iconEnd!;

// 	return (
// 		<Component
// 			className={classNames(
// 				"flex w-full items-center rounded-md p-2 text-xs hover:bg-slate-100",
// 				className,
// 			)}
// 			{...rest}>
// 			{children ? children : label}
// 		</Component>
// 	);
// }

// export default Object.assign(Dropdown, {
// 	Item: DropdownItem,
// });
