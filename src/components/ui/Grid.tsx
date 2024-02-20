import { GridColumn, gaps } from "@/utils/constants/constants";
import { Numbers } from "@/utils/types";
import classNames from "classnames";

export type GridProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
	size?: Numbers;
	gap?: Numbers;
};
function Grid({ gap, size, children, className }: GridProps) {
	const classes = classNames(
		"grid",
		GridColumn[size as keyof typeof GridColumn],
		{
			["gap-" + gaps[gap as keyof typeof gaps]]: gap,
		},
		className,
	);
	return <div className={classes}>{children}</div>;
}

export default Grid;
