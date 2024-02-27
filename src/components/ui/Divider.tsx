import classNames from "classnames";

/**
 * Divider components
 * @returns
 */
export type DividerProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};
function Divider({ className }: DividerProps) {
	return (
		<div
			className={classNames("mb-1 mt-1 border-b border-gray-100", className)}
		/>
	);
}
export default Divider;
