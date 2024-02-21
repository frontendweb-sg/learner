import { Sizes, Width } from "@/utils/styles";
import classNames from "classnames";
import { ReactNode, RefObject } from "react";

type WidthPrefix = "w-" | "min-" | "max-";
export type Props<T> = {
	as?: T;
	width?: Sizes;
	widthPrefix?: WidthPrefix;
};
export type BoxProps<T extends React.ElementType> = React.PropsWithChildren<
	Props<T>
> &
	Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>> & {};

function Box<T extends React.ElementType>({
	as,
	children,
	width,
	widthPrefix = "w-",
	className,
	...rest
}: BoxProps<T>) {
	const Component = as || "span";
	const key = `${widthPrefix}${width}`;
	const classes = classNames(Width[key as keyof typeof Width], className);
	return (
		<Component className={classes} {...rest}>
			{children}
		</Component>
	);
}

export default Box;
