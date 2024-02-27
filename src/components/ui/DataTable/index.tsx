import classNames from "classnames";
import { ReactNode } from "react";

import Table from "../Table";
import DataTableBody from "./DataTableBody";
import DataTableHeader from "./DataTableHeader";

export type TableCommonProps<T, K extends keyof T> = {
	rows: Array<T>;
	columns: Array<ColumnProps<T, K>>;
	renderAction?: (row?: T) => ReactNode;
	children?: ReactNode;
};

export type ColumnProps<T, K extends keyof T> = {
	field: K;
	headerName?: string;
	renderCell?: (
		row: T,
		column: ColumnProps<T, K>,
		index: number,
	) => React.ReactNode;
	valueGetter?: (row: T) => keyof T;
};

export type TableProps<T, K extends keyof T> = TableCommonProps<T, K> &
	React.TableHTMLAttributes<HTMLTableElement> & {};

/**
 * DataTable component
 * @returns
 */
function DataTable<T, K extends keyof T>({
	rows,
	children,
	className,
	columns = [],
	renderAction,
	...rest
}: TableProps<T, K>) {
	if (typeof renderAction !== "function") {
		throw new Error("renderAction should be function");
	}
	return (
		<Table className={classNames(className)}>
			<DataTableHeader
				rows={rows}
				columns={columns}
				renderAction={renderAction}
			/>
			<DataTableBody
				rows={rows}
				columns={columns}
				renderAction={renderAction}
			/>
		</Table>
	);
}

export default DataTable;
