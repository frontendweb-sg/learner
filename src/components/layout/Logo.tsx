import Link, { LinkProps } from "next/link";
import classNames from "classnames";
import { AppContent } from "@/utils/constants/content";
import { poppins } from "@/utils/fonts/font";
import { BookIcon } from "lucide-react";
import Avatar from "../common/Avatar";

export type LogoProps = LinkProps &
	React.AnchorHTMLAttributes<HTMLLinkElement> & {};
function Logo({ href = "/", children, className }: LogoProps) {
	return (
		<Link
			href={href}
			className={classNames(
				"dark:text-navy-100 line-clamp-1 flex items-center space-x-2 text-lg font-medium tracking-wide text-slate-800",
				className,
				poppins.className,
			)}>
			<Avatar className="flex items-center justify-center bg-blue-100">
				<BookIcon size={16} />
			</Avatar>
			<span>{AppContent.brandName}</span>
		</Link>
	);
}
export default Logo;
