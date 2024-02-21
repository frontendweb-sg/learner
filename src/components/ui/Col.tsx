import classNames from "classnames";

type ColType = "start" | "end" | "col";
const GridColumns = (type: ColType = "col") => ({
	1: `col-${type}-1`,
	2: `col-${type}-2`,
	3: `col-${type}-3`,
	4: `col-${type}-4`,
	5: `col-${type}-5`,
	6: `col-${type}-6`,
	7: `col-${type}-7`,
	8: `col-${type}-8`,
	9: `col-${type}-9`,
	10: `col-${type}-10`,
	11: `col-${type}-11`,
	12: `col-${type}-12`,
	full: `col-${type}-full`,
});

export type ColProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
	colType?: ColType;
	size?: keyof typeof GridColumns;
};
function Col({ colType = "col", size, children, className }: ColProps) {
	const classes = classNames(
		GridColumns(colType)[size as keyof typeof GridColumns],
		className,
	);
	return <div className={classes}>{children}</div>;
}
export default Col;
