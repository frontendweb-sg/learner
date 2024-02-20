import {
	ColorType,
	ColorVariant,
	SizeType,
	Variant,
	VariantType,
} from "@/utils/types";
import classNames from "classnames";
import { LoaderIcon } from "lucide-react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	size?: SizeType;
	color?: ColorType;
	variant?: VariantType;
	pills?: boolean;
	loading?: boolean;
};

const ButtonSizes = {
	xs: "px-2 py-.5",
	sm: "px-4 py-1",
	md: "px-5 py-1.5 min-w-24",
	lg: "px-6 py-1.5",
	xl: "px-7 py-1.5",
	full: "w-full py-1.5`",
};

const FilledColors: ColorVariant = {
	primary: "bg-rose-600 text-white",
	secondary: "bg-slate-600 text-white",
	info: "bg-sky-600 text-white",
	warning: "bg-yellow-600",
	success: "bg-green-600",
	danger: "bg-red-600",
	gray: "bg-gray-600",
};

const OutlinedColors: ColorVariant = {
	primary:
		"border border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white",
	secondary:
		"border border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white",
	info: "border border-sky-600 text-sky-600",
	warning: "border border-yellow-600 text-yellow-600",
	success: "border border-green-600 text-green-600",
	danger: "border border-red-600 text-red-600",
	gray: "border border-gray-600 text-gray-600",
};
const TextColors: ColorVariant = {
	primary: "text-rose-600 hover:border-rose-600 border border-rose-600/0",
	secondary: "text-slate-600 hover:border-slate-600 border border-slate-600/0",
	info: "text-sky-600 hover:border-sky-600 border border-sky-600/0",
	warning: "text-yellow-600 hover:border-yellow-600 border border-yellow-600/0",
	success: "text-green-600 hover:border-green-600 border border-green-600/0",
	danger: "text-red-600 hover:border-red-600 border border-red-600/0",
	gray: "text-gray-600 hover:border-gray-600 border border-gray-600/0",
};

const Variants: Variant = {
	filled: FilledColors,
	outlined: OutlinedColors,
	text: TextColors,
};

function Button({
	type = "button",
	size = "md",
	color = "primary",
	variant = "outlined",
	children,
	pills,
	loading,
	...rest
}: ButtonProps) {
	const colors = Variants[variant as keyof typeof Variants];
	const classes = classNames(
		"text-center font-medium flex justify-center space-x-2 items-center",
		pills ? "rounded-full" : "rounded-md",
		variant !== "text" && "shadow-md ",
		ButtonSizes[size],
		colors[color as keyof typeof colors],
	);
	return (
		<button role="button" className={classes} type={type} {...rest}>
			{loading && <LoaderIcon className="animate-spin" size={16} />}
			<span>{children}</span>
		</button>
	);
}
export default Button;
