import classNames from "classnames";

export type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {};

/**
 * Table component
 * @param param0
 * @returns
 */
function Table({ children, className, ...rest }: TableProps) {
	return (
		<table className={classNames("w-full", className)} {...rest}>
			{children}
		</table>
	);
}

export default Table;
