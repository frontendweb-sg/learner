import { Numbers } from "@/utils/types";
import classNames from "classnames";

const GridColumn = {
	1: "grid-cols-1",
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4",
	5: "grid-cols-5",
	6: "grid-cols-6",
	7: "grid-cols-7",
	8: "grid-cols-8",
	9: "grid-cols-9",
	10: "grid-cols-10",
	11: "grid-cols-11",
	12: "grid-cols-12",
};

const Gaps = {
	0: "gap-0",
	1: "gap-1",
	2: "gap-2",
	3: "gap-3",
	4: "gap-4",
	5: "gap-5",
	6: "gap-6",
	7: "gap-7",
	8: "gap-8",
	9: "gap-9",
	10: "gap-10",
	11: "gap-11",
	12: "gap-12",
};

export type GridProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
	size?: Numbers;
	gap?: Numbers;
};
function Grid({ gap, size, children, className }: GridProps) {
	const classes = classNames(
		"grid",
		GridColumn[size as keyof typeof GridColumn],
		Gaps[gap as keyof typeof Gaps],
		className,
	);
	return <div className={classes}>{children}</div>;
}

export default Grid;
