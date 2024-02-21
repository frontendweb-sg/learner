import classNames from "classnames";

export type PageTitleProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
	title?: string;
	subtitle?: string;
};

/**
 * Page title component
 * @param param0
 * @returns
 */
function PageTitle({ title, subtitle, className, children }: PageTitleProps) {
	const classes = classNames(
		"flex mb-4 pb-4 items-center justify-between",
		className,
	);
	return (
		<div className={classes}>
			<h1 className="dark:text-navy-50  text-lg font-medium text-slate-700">
				{title}
				<small className="block text-xs font-normal text-gray-500">
					{subtitle}
				</small>
			</h1>
			{children}
		</div>
	);
}
export default PageTitle;
