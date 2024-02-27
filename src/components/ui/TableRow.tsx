import classNames from "classnames";

export type TableRowProps = React.TableHTMLAttributes<HTMLTableRowElement> & {};
/**
 * Table row component
 * @param param0
 * @returns
 */
function TableRow({ children, className, ...rest }: TableRowProps) {
	return (
		<tr className={classNames(className)} {...rest}>
			{children}
		</tr>
	);
}
export default TableRow;
