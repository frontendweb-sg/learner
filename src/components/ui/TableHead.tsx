import classNames from "classnames";
export type TableHeadProps = React.HTMLAttributes<HTMLTableSectionElement> & {};
/**
 * Table row component
 * @param param0
 * @returns
 */
function TableHead({ children, className, ...rest }: TableHeadProps) {
	return (
		<thead className={classNames(className)} {...rest}>
			{children}
		</thead>
	);
}
export default TableHead;
