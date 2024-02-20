import classNames from "classnames";
import { LucideIcon, XCircle } from "lucide-react";

export type SelectProps<T> = React.SelectHTMLAttributes<HTMLSelectElement> & {
	iconStart?: LucideIcon;
	iconEnd?: LucideIcon;
	label?: string;
	error?: string;
	options: T[];
	getOptionLabel?: (option: T) => string;
};

function Select<T extends { label?: string }>({
	name,
	iconEnd,
	iconStart,
	label,
	error,
	options,
	getOptionLabel,
	...rest
}: SelectProps<T>) {
	let optionLabel = getOptionLabel ?? ((option: T) => option.label);

	const clasess = classNames(
		"bg-white flex  text-sm  item-center rounded-md p-3 relative border border-gray-200 hover:border-slate-300 focus:bg-slate-100",
		{
			"border-rose-600 text-rose-600": error,
		},
	);
	let StartIcon = iconStart!;
	let EndIcon = iconEnd!;
	return (
		<div>
			{label && (
				<span className="block text-sm font-medium text-slate-700">
					{label}
				</span>
			)}
			<div className={clasess}>
				{iconStart && <StartIcon className="mr-2 text-inherit" />}
				<select
					name={name}
					className={classNames("flex-1 bg-transparent outline-none", {
						"placeholder:text-rose-600": error,
					})}>
					{options.map((option: T) => (
						<option>{optionLabel(option) as string}</option>
					))}
				</select>
				{error && (
					<span className="absolute inset-y-0 right-3 flex items-center pl-2">
						<XCircle />
					</span>
				)}
				{!error && iconEnd && <EndIcon className="ml-2" />}
			</div>
			{error && <p className="mt-2 text-xs text-rose-700">{error}</p>}
		</div>
	);
}

export default Select;
