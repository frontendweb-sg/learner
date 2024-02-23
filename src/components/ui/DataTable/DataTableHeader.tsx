import TableHead from "../TableHead";
import TableRow from "../TableRow";
import TableCell from "../TableCell";
import { AppContent } from "@/utils/constants/content";
import type { ColumnProps, TableCommonProps } from ".";

type DataBodyProps<T, K extends keyof T> = TableCommonProps<T, K> & {};

/**
 * Table head component
 * @param param0
 * @returns
 */
function DataTableHeader<T, K extends keyof T>({
	columns,
	renderAction,
}: DataBodyProps<T, K>) {
	return (
		<TableHead className="rounded-t-md bg-slate-200">
			<TableRow className="rounded-t-md ">
				{columns.map((column: ColumnProps<T, K>) => (
					<TableCell
						as="th"
						className="font-semibold"
						key={column.field as string}>
						{column.headerName}
					</TableCell>
				))}
				{renderAction && (
					<TableCell className="text-right" align="right" as="th">
						{AppContent.action}
					</TableCell>
				)}
			</TableRow>
		</TableHead>
	);
}

export default DataTableHeader;
