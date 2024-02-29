type SwitchProps = React.InputHTMLAttributes<HTMLInputElement> & {
	prefixLabel?: string;
	postifixLabel?: string;
};
export default function Switch({
	prefixLabel,
	postifixLabel,
	name,
	...rest
}: SwitchProps) {
	return (
		<label
			className="flex items-center justify-between text-sm  text-slate-600"
			htmlFor="switch">
			{prefixLabel && <span>{prefixLabel}</span>}
			<input
				className="sr-only peer"
				id="switch"
				type="checkbox"
				name={name}
				{...rest}
			/>
			<div className="relative w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
			{postifixLabel && <span>{postifixLabel}</span>}
		</label>
	);
}
