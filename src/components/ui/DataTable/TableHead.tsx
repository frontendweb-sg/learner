import DataCell from "./TableCell";
import type { ColumnProps, TableCommonProps } from "./DataTable";

type DataBodyProps<T, K extends keyof T> = TableCommonProps<T, K> & {};

/**
 * Table head component
 * @param param0
 * @returns
 */
function TableHead<T, K extends keyof T>({
	rows,
	columns,
	onAction,
}: DataBodyProps<T, K>) {
	return (
		<thead>
			<tr className="rounded-t-md border-b border-slate-200/50 bg-slate-100">
				{columns.map((column: ColumnProps<T, K>) => (
					<DataCell
						as="th"
						className="rounded-t-md font-semibold"
						key={column.field as string}>
						{column.headerName}
					</DataCell>
				))}
				{onAction && (
					<DataCell className="text-right" align="right" as="th">
						Action
					</DataCell>
				)}
			</tr>
		</thead>
	);
}

export default TableHead;
