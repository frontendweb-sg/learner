import { ReactNode, RefObject } from "react";

export type BoxProps<T extends React.ElementType> = {
	as?: T;
	children: ReactNode;
} & React.ComponentPropsWithRef<T>["ref"];

function Box<T extends React.ElementType>({
	as,
	children,
	...rest
}: BoxProps<T>) {
	const Component = as || "span";
	return <Component {...rest}>{children}</Component>;
}

export default Box;
