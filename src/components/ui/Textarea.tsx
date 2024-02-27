import classNames from "classnames";
import { LucideIcon, XCircle } from "lucide-react";
import { ReactElement, TextareaHTMLAttributes } from "react";

export type TextareaProps =
	React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
		iconStart?: LucideIcon;
		iconEnd?: ReactElement;
		label?: string;
		error?: string;
	};

/**
 * Input component
 * @param param0
 * @returns
 */
function Textarea({
	label,
	name,
	placeholder,
	iconStart,
	iconEnd,
	error,
	...rest
}: TextareaProps) {
	const clasess = classNames(
		"bg-white flex text-sm  item-center rounded-md p-2.5 relative border border-gray-200 hover:border-slate-300 focus:bg-slate-100",
		{
			"border-rose-600 text-rose-600": error,
		},
	);
	let StartIcon = iconStart!;

	return (
		<div>
			{label && (
				<span className="block text-xs font-medium text-slate-700 mb-2">
					{label}
				</span>
			)}
			<div className={clasess}>
				{iconStart && <StartIcon className="mr-2 text-inherit" />}
				<textarea
					className={classNames("flex-1 bg-transparent outline-none", {
						"placeholder:text-rose-600": error,
					})}
					name={name}
					placeholder={placeholder}
					{...rest}
				/>
				{error && (
					<span className="absolute inset-y-0 right-3 flex items-center pl-2">
						<XCircle />
					</span>
				)}
				{!error && iconEnd}
			</div>
			{error && <p className="mt-2 text-xs text-rose-700">{error}</p>}
		</div>
	);
}
export default Textarea;
