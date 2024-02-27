import classNames from "classnames";

type PanelProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};
export default function Panel({ children, className, ...rest }: PanelProps) {
	return (
		<div
			className={classNames("rounded-md bg-white p-4 shadow-md", className)}
			{...rest}>
			{children}
		</div>
	);
}
