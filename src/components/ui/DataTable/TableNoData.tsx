import { ReactNode } from "react";
import TableCell from "../TableCell";
import TableRow from "../TableRow";

/**
 * Component
 * @returns
 */

function TableNoData({ children }: { children?: ReactNode }) {
	return (
		<TableRow key="no-data">
			<TableCell>{children ? children : "No data"}</TableCell>
		</TableRow>
	);
}
export default TableNoData;
