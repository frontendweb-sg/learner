import Link, { LinkProps } from "next/link";
import {
	ButtonIconSize,
	ButtonProps,
	ButtonSizes,
	Variants,
} from "../ui/Button";
import classNames from "classnames";

type NavLinkProps = LinkProps &
	React.LinkHTMLAttributes<HTMLAnchorElement> &
	ButtonProps & {};
function NavLink({
	href,
	children,
	pills,
	icon,
	variant = "filled",
	color = "primary",
	size = "md",
	className,
	...rest
}: NavLinkProps) {
	const colors = Variants[variant as keyof typeof Variants];

	const classes = classNames(
		"text-center font-medium flex justify-center space-x-2 items-center",
		pills || icon ? "rounded-full" : "rounded-md",
		variant !== "text" && "shadow-md ",
		icon ? ButtonIconSize[size] : ButtonSizes[size],
		colors[color as keyof typeof colors],
		className,
	);
	return (
		<Link className={classes} href={href} {...rest}>
			{children}
		</Link>
	);
}

export default NavLink;
