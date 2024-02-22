"use client";

import { PenIcon, Trash2Icon } from "lucide-react";
import Button from "../Button";
import Dropdown from "../Dropdown";
import Link from "next/link";
import Divider from "../Divider";
import { Action } from ".";

type TableActionProps<T> = {
	as?: "dropdown" | "slide";
	onAction: (status: Action, row: T) => void;
	row: T;
};
function TableAction<T>({ as, onAction, row }: TableActionProps<T>) {
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

	return (
		<Dropdown as="div">
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
