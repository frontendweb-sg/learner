import classNames from "classnames";
import React from "react";

export type PageTitleProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
	title?: string;
	subtitle?: string;
	headingProps?: React.HTMLAttributes<HTMLHeadingElement>;
};

/**
 * Page title component
 * @param param0
 * @returns
 */

function PageTitle({
	title,
	subtitle,
	className,
	children,
	headingProps,
	...rest
}: PageTitleProps) {
	const classes = classNames(
		"flex mb-4 pb-4 items-center justify-between",
		className,
	);

	return (
		<div className={classes} {...rest}>
			<h1
				className={classNames(
					"dark:text-navy-50 font-roboto text-lg font-medium",
					headingProps?.className,
				)}>
				{title}
				<small className="block text-xs font-lato font-light text-gray-400">
					{subtitle}
				</small>
			</h1>
			{children}
		</div>
	);
}
export default PageTitle;
