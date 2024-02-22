import { ReactNode } from "react";
import TableCell from "./TableCell";

/**
 * Component
 * @returns
 */
function TableNoData({ children }: { children: ReactNode }) {
	return (
		<tr key="no-data">
			<TableCell>{children ? children : "No data"}</TableCell>
		</tr>
	);
}
export default TableNoData;
