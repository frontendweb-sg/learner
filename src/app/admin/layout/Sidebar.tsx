"use client";
import classNames from "classnames";
import NavItem from "@/components/common/NavItem";
import Logo from "@/components/layout/Logo";
import { SidebarMenu } from "./menu";
import { IMenu } from "@/utils/types";

type SidebarProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
	isOpen?: boolean;
};
function Sidebar({}: SidebarProps) {
	return (
		<aside
			className={classNames(
				"fixed  left-0 z-40 h-screen w-64 -translate-x-full bg-slate-800 p-3 text-white transition-transform md:translate-x-0",
			)}>
			<Logo className="mb-4 py-2" href="/admin" />
			{SidebarMenu.map((menu: IMenu) => {
				return (
					<div key={menu.slug}>
						<span className="mb-4 text-xs uppercase text-slate-400">
							{menu.name}
						</span>
						<ul>
							{menu.children?.map((submenu: IMenu) => (
								<NavItem key={submenu.slug} item={submenu} root="/admin/" />
							))}
						</ul>
					</div>
				);
			})}
		</aside>
	);
}
export default Sidebar;
