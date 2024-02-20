import { IMenu } from "@/utils/types";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
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

	const classes = classNames("mb-2 px-4 py-2 block", className);
	return (
		<li
			className={classNames(
				"mb-2 rounded-md",
				isActive ? "bg-white text-rose-700" : "bg-slate-700",
				parentProps?.className,
			)}
			{...parentProps}>
			<Link className={classes} href={root + item.slug}>
				{item.name}
			</Link>
		</li>
	);
}

export default NavItem;
