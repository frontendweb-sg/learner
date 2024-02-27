"use client";

import classNames from "classnames";
import { LogOutIcon } from "lucide-react";

import NavItem from "@/components/common/NavItem";
import Logo from "@/components/layout/Logo";
import Button from "@/components/ui/Button";

import { IMenu } from "@/utils/types";

import { SidebarMenu } from "./menu";

type SidebarProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
	isOpen?: boolean;
};
function Sidebar({ isOpen }: SidebarProps) {
	return (
		<aside
			className={classNames(
				"fixed  left-0 z-40 h-screen w-64  -translate-x-full bg-white p-3  shadow-md transition-transform sm:translate-x-0 md:visible",
			)}>
			<Logo className="mb-4 py-2" href="/admin" />
			<div className="flex h-[calc(100%-4.5rem)] grow flex-col">
				{SidebarMenu.map((menu: IMenu, index: number) => {
					return (
						<div key={menu.slug}>
							<div className="mb-3 mt-4 flex items-center justify-between px-4">
								<span className="text-xs  uppercase text-gray-400">
									{menu.name}
								</span>
								{/* <div className="dark:bg-navy-500 ml-2 h-px flex-grow bg-slate-200"></div> */}
							</div>
							<ul className="font-inter text-xs+ mt-1 space-y-1 px-2 font-medium">
								{menu.children?.map((submenu: IMenu) => (
									<NavItem key={submenu.slug} item={submenu} root="/admin/" />
								))}
							</ul>
							{index !== SidebarMenu.length - 1 && (
								<div className="dark:bg-navy-500 mx-4 my-5 h-px bg-slate-200"></div>
							)}
						</div>
					);
				})}
			</div>

			<div className="absolute bottom-0 left-5 right-5 flex items-center justify-between border-t border-gray-200 py-4">
				<p className="text-xs">
					&copy; {new Date().getFullYear()} - version: 1.0.0
				</p>
				<Button size="xs" icon>
					<LogOutIcon size={14} />
				</Button>
			</div>
		</aside>
	);
}
export default Sidebar;
