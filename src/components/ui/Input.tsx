import classNames from "classnames";
import { LucideIcon, XCircle } from "lucide-react";
import { ReactElement } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	iconStart?: LucideIcon;
	iconEnd?: LucideIcon;
	label?: string;
	error?: string;
};

/**
 * Input component
 * @param param0
 * @returns
 */
function Input({
	label,
	name,
	placeholder,
	iconStart,
	iconEnd,
	error,
	readOnly,
	className,
	...rest
}: InputProps) {
	const clasess = classNames(
		"bg-white flex  text-sm  item-center rounded-md  relative border border-gray-200 hover:border-slate-300 focus:bg-slate-100",
		{
			"border-rose-600 text-rose-600": error,
			"bg-gray-100/50 hover:border-gray-200": readOnly,
		},
		className,
	);
	let StartIcon = iconStart!;
	let EndIcon = iconEnd!;
	return (
		<div>
			{label && (
				<span className="block text-xs font-medium text-slate-700 mb-2">
					{label}
				</span>
			)}
			<div className={clasess}>
				{iconStart && <StartIcon className="mr-2 text-inherit" />}
				<input
					aria-readonly={readOnly}
					readOnly={readOnly}
					className={classNames(
						"flex-grow rounded-md  bg-transparent p-3 outline-none",
						{
							"placeholder:text-rose-600": error,
						},
					)}
					name={name}
					placeholder={placeholder}
					{...rest}
				/>
				{error && (
					<span className="absolute inset-y-0 right-3 flex items-center pl-2">
						<XCircle size={14} />
					</span>
				)}
				{!error && iconEnd && <EndIcon className="ml-2" />}
			</div>
			{error && <p className="mt-2 text-xs text-rose-700">{error}</p>}
		</div>
	);
}
export default Input;
