import { IMenu } from "@/utils/types";
import classNames from "classnames";
import { HomeIcon } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ReactElement, ReactNode } from "react";
import { UrlObject } from "url";

/**
 * Nav item component
 * @param param0
 * @returns
 */

export type NavItemProps = LinkProps &
	React.AnchorHTMLAttributes<HTMLLinkElement> & {
		to?: string | UrlObject;
		root: string;
		item: IMenu;
		parentProps?: React.LiHTMLAttributes<HTMLLIElement>;
	};
function NavItem({
	parentProps,
	root = "/",
	item,
	className,
}: Omit<NavItemProps, "href">) {
	const segment = useSelectedLayoutSegment();
	const isActive = item.slug === segment;

	const classes = classNames(
		"px-2 py-2 block text-sm flex items-center space-x-2",
		className,
	);

	const Icon = item.icon!;
	return (
		<li
			className={classNames(
				" roundedtracking-wide w-full cursor-pointer items-center rounded-md outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800",
				isActive ? "bg-slate-100 text-slate-800" : "text-slate-500 ",
				parentProps?.className,
			)}
			{...parentProps}>
			<Link className={classes} href={root + item.slug}>
				{item.icon! && <Icon size={16} />}
				<span>{item.name}</span>
			</Link>
		</li>
	);
}

export default NavItem;
