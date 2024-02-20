import { AppContent } from "@/utils/constants/content";
import classNames from "classnames";
import { BookIcon } from "lucide-react";
import Link, { LinkProps } from "next/link";

export type LogoProps = LinkProps &
	React.AnchorHTMLAttributes<HTMLLinkElement> & {};
function Logo({ href = "/", children, className }: LogoProps) {
	return (
		<Link
			href={href}
			className={classNames(
				"flex space-x-3 font-lato font-black italic tracking-wider",
				className,
			)}>
			<BookIcon /> <span>{AppContent.brandName}</span>
		</Link>
	);
}
export default Logo;
