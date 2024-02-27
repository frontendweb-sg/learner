import classNames from "classnames";
import TableBody from "../TableBody";
import TableCell from "../TableCell";
import type { ColumnProps, TableCommonProps } from ".";
import TableRow from "../TableRow";
import TableNoData from "./TableNoData";

type TableBodyProps<T, K extends keyof T> = React.PropsWithChildren<
	TableCommonProps<T, K>
> & {};
/**
 * Table body component
 * @param param0
 * @returns
 */
function DataTableBody<T, K extends keyof T>({
	rows,
	columns,
	children,
	renderAction,
}: TableBodyProps<T, K>) {
	return (
		<TableBody>
			{rows.map((row: T, index: number) => {
				return (
					<TableRow key={index}>
						{columns.map((column: ColumnProps<T, K>, subindex: number) => {
							if ("renderCell" in column) {
								return (
									<TableCell
										as="td"
										key={row[column.field] as string}
										className={classNames({
											"border-b": index != rows.length - 1,
										})}>
										{column.renderCell?.(row, column, index)}
									</TableCell>
								);
							}
							return (
								<TableCell
									as="td"
									key={row[column.field] as string}
									className={classNames({
										"border-b": index != rows.length - 1,
									})}>
									{row[column.field] as string}
								</TableCell>
							);
						})}
						{renderAction && (
							<TableCell
								as="td"
								key={"action-" + index}
								className={classNames({
									"border-b": index != rows.length - 1,
								})}>
								{renderAction?.(row)}
							</TableCell>
						)}
					</TableRow>
				);
			})}

			{rows.length === 0 && <TableNoData />}
			{children}
		</TableBody>
	);
}

export default DataTableBody;
