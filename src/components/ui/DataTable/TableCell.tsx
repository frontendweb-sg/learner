import classNames from "classnames";

export type TableCellProps<T extends React.ElementType> = {
	as?: T;
};

type DataProps<T extends React.ElementType> = React.PropsWithChildren<
	TableCellProps<T>
> &
	Omit<React.ComponentPropsWithoutRef<T>, keyof TableCellProps<T>>;

function TableCell<T extends "th" | "td">({
	as,
	children,
	className,
	...rest
}: DataProps<T>) {
	const Component = as || "td";
	return (
		<Component
			className={classNames("p-2 text-left text-sm  text-slate-700", className)}
			{...rest}>
			{children}
		</Component>
	);
}
export default TableCell;
