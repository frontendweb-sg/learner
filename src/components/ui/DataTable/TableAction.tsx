import { ReactNode } from "react";
import Dropdown from "../Dropdown";

type TableActionProps = {
	as?: "dropdown" | "slide";
	children: ReactNode;
};

function TableAction({ as, children }: TableActionProps) {
	return (
		<Dropdown isSlider={as === "slide"} as="div">
			{children}
		</Dropdown>
	);
}
export default TableAction;
