import TableBody from "./TableBody";
import TableHead from "./TableHead";
import type { ReactNode } from "react";

export type Action = "update" | "delete" | "active" | "inactive";
export type TableCommonProps<T, K extends keyof T> = {
	rows: Array<T>;
	columns: Array<ColumnProps<T, K>>;
	onAction?: (status?: Action, row?: T) => ReactNode;
};
export type ColumnProps<T, K extends keyof T> = {
	field: K;
	headerName?: string;
	render?: (
		row: T,
		column: ColumnProps<T, K>,
		index: number,
	) => React.ReactNode;
	valueGetter?: (row: T) => keyof T;
};

export interface TableProps<T, K extends keyof T>
	extends TableCommonProps<T, K> {}
/**
 * Data table
 * @param param0
 * @returns
 */
function DataTable<T, K extends keyof T>({
	columns,
	rows,
	onAction,
}: TableProps<T, K>) {
	return (
		<div className="rounded-sm bg-white p-3 shadow-md">
			<table className="w-full">
				<TableHead rows={rows} columns={columns} onAction={onAction} />
				<TableBody rows={rows} columns={columns} onAction={onAction} />
			</table>
		</div>
	);
}

export default DataTable;
