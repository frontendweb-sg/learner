"use client";
import classNames from "classnames";
import { useToggle } from "@/hooks/useToggle";
import { ReactElement, ReactNode, createContext, useRef } from "react";
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
	renderHeader?: ReactNode | ReactElement;
	renderFooter?: ReactNode;
	isSlider?: boolean;
}; // main props

type ItemProps<T extends React.ElementType> = {
	as?: T;
	iconStart?: LucideIcon;
	iconEnd?: LucideIcon;
	label?: string;
	parentProps?: React.LiHTMLAttributes<HTMLLIElement>;
};

export type DropdownProps<T extends React.ElementType> =
	React.PropsWithChildren<MainProps<T>> &
		Omit<React.ComponentPropsWithRef<T>["ref"], keyof MainProps<T>>;
function Dropdown<T extends React.ElementType = "div">({
	as,
	children,
	icon = MoreVertical,
	label,
	renderHeader,
	renderFooter,
	isSlider,
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
				className={classNames(
					open && "open",
					"relative text-right",
					isSlider ? "overflow-visible" : "",
				)}
				{...rest}>
				<button onClick={handleToggle} className="">
					{icon! && <Icon size={16} />} {label}
				</button>
				{isSlider ? (
					<div
						className={classNames(
							"absolute top-0 transition-all ease-in-out ",
							open
								? "right-10 translate-x-0 opacity-100"
								: "translate-x-full opacity-0",
						)}>
						<ul className="flex items-center">{children}</ul>
					</div>
				) : (
					<div
						className={classNames(
							"before:contents[''] absolute -right-5 w-40 rounded-md border border-slate-100/80 bg-white p-4 shadow-sm before:absolute before:-top-2 before:right-5 before:border-b-8 before:border-l-8 before:border-r-8 before:border-b-slate-500 before:border-l-transparent before:border-r-transparent",
							!open && "collapse",
						)}>
						{renderHeader}
						<ul>{children}</ul>
						{renderFooter}
					</div>
				)}
			</Component>
		</DropdownContext.Provider>
	);
}

export type DropdownItemProps<T extends React.ElementType> =
	React.PropsWithChildren<ItemProps<T>> &
		Omit<React.ComponentPropsWithoutRef<T>, keyof ItemProps<T>>;

/**
 * Dropdown item
 * @param param0
 * @returns
 */
function DropdownItem<T extends React.ElementType>({
	as,
	label,
	iconEnd,
	children,
	iconStart,
	className,
	parentProps,
	...rest
}: DropdownItemProps<T>) {
	const Component = as || "button";
	const StartIcon = iconStart!;
	const EndIcon = iconEnd!;

	return (
		<li {...parentProps} className={classNames(parentProps?.className)}>
			<Component
				className={classNames(
					"flex w-full items-center rounded-md p-2 text-xs transition-all ease-in-out hover:bg-slate-100",
					className,
				)}
				{...rest}>
				{iconStart && <StartIcon size={14} className="mr-2" />}
				{children ? children : label}
				{iconEnd && <EndIcon size={14} className="ml-2" />}
			</Component>
		</li>
	);
}

export default Object.assign(Dropdown, {
	Item: DropdownItem,
});
