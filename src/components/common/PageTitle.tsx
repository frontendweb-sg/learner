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
		"flex mb-3 border-b border-gray-200 pb-3 items-center justify-between",
		className,
	);
	return (
		<div className={classes}>
			<div>
				<h1 className="font-roboto font-semibold">
					{title}
					<small className="block text-xs font-normal text-gray-500">
						{subtitle}
					</small>
				</h1>
			</div>
			{children}
		</div>
	);
}
export default PageTitle;
