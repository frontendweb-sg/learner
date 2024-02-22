import classNames from "classnames";
import DataCell from "./TableCell";
import type { ColumnProps, TableCommonProps } from "./DataTable";

import TableAction from "./TableAction";

type TableBodyProps<T, K extends keyof T> = React.PropsWithChildren<
	TableCommonProps<T, K>
> & {};
/**
 * Table body component
 * @param param0
 * @returns
 */
function TableBody<T, K extends keyof T>({
	rows,
	columns,
	children,
	onAction,
}: TableBodyProps<T, K>) {
	return (
		<tbody>
			{rows.map((row: T, index: number) => {
				return (
					<tr key={index}>
						{columns.map((column: ColumnProps<T, K>, subindex: number) => {
							return (
								<DataCell
									as="td"
									key={row[column.field] as string}
									className={classNames({
										"border-b": index != rows.length - 1,
									})}>
									{column.render
										? column.render?.(row, column, index)
										: (row[column.field] as string)}
								</DataCell>
							);
						})}
						{onAction && (
							<DataCell>
								<TableAction />
							</DataCell>
						)}
					</tr>
				);
			})}
			{children}
		</tbody>
	);
}

export default TableBody;
