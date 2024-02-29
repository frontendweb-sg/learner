import classNames from "classnames";
import { ReactNode } from "react";

type PanelProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};
function Panel({ children, className, ...rest }: PanelProps) {
	return (
		<div
			className={classNames("rounded-md bg-white p-4 shadow-sm", className)}
			{...rest}>
			{children}
		</div>
	);
}

type PanelTitleProps = PanelProps & {
	headingLabel: string;
};
function PanelTitle({ headingLabel, children }: PanelTitleProps) {
	return (
		<div
			className={classNames(
				"flex items-center justify-between text-sm text-slate-700 pb-4",
			)}>
			<h2>{headingLabel}</h2>
			<div>{children}</div>
		</div>
	);
}

Panel.Title = PanelTitle;
export default Panel;
