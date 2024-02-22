"use client";
import { Edit2Icon, Eye, EyeOff, PenIcon, Trash2Icon } from "lucide-react";
import Button from "../Button";
import Dropdown from "../Dropdown";
import Link from "next/link";
import Divider from "../Divider";

type TableActionProps = {
	as?: "dropdown" | "slide";
};
function TableAction({ as }: TableActionProps) {
	if (as === "slide") {
		return (
			<div className="flex items-center justify-end">
				<Dropdown as="div" isSlider>
					<Dropdown.Item
						as={Button}
						icon
						variant="text"
						iconStart={Trash2Icon}
					/>
					<Dropdown.Item as={Link} href="/" iconStart={PenIcon} />
				</Dropdown>
			</div>
		);
	}
	<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
		<div>Bonnie Green</div>
		<div className="truncate font-medium">name@flowbite.com</div>
	</div>;
	return (
		<Dropdown
			as="div"
			renderHeader={
				<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
					<div>Bonnie Green</div>
					<div className="truncate font-medium">name@flowbite.com</div>
				</div>
			}>
			<Dropdown.Item
				as={Button}
				icon
				variant="text"
				label="Delete"
				iconStart={Trash2Icon}
			/>
			<Dropdown.Item iconStart={PenIcon}>Edit</Dropdown.Item>
			<Dropdown.Item>Active</Dropdown.Item>
			<Divider />
			<Dropdown.Item>Inactive</Dropdown.Item>
		</Dropdown>
	);
}
export default TableAction;
