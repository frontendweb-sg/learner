import classNames from "classnames";

export type CoverProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};

/**
 * Cover component
 * @param param0
 * @returns
 */
function Cover({ children, className }: CoverProps) {
	return (
		<div className={classNames("flex h-screen w-full bg-gray-100 ", className)}>
			{children}
		</div>
	);
}
export default Cover;
