import classNames from "classnames";

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement> & {};
/**
 * Table row component
 * @param param0
 * @returns
 */
function TableBody({ children, className, ...rest }: TableBodyProps) {
	return (
		<thead className={classNames(className)} {...rest}>
			{children}
		</thead>
	);
}
export default TableBody;
