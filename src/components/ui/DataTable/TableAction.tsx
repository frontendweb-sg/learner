"use client";
import { Edit2Icon, Eye, EyeOff, PenIcon, Trash2Icon } from "lucide-react";
import Button from "../Button";
import Dropdown from "../Dropdown";
import Link from "next/link";

type TableActionProps = {
	as?: "dropdown" | "rail";
};
function TableAction({ as }: TableActionProps) {
	if (as === "rail") {
		return (
			<div className="flex items-center justify-end">
				<Button icon variant="text" size="xs">
					<Edit2Icon size={14} />
				</Button>
				<Button icon variant="text" size="xs">
					<Trash2Icon size={14} />
				</Button>
				<Button icon variant="text" size="xs">
					<Eye size={14} />
				</Button>
				<Button icon variant="text" size="xs">
					<EyeOff size={14} />
				</Button>
			</div>
		);
	}
	return (
		<div>
			<Dropdown as="div">
				<Dropdown.Item as={Button} label="Delete" iconStart={Trash2Icon} />
				<Dropdown.Item iconStart={PenIcon}>Edit</Dropdown.Item>
				<Dropdown.Item>Active</Dropdown.Item>

				<Dropdown.Item>Inactive</Dropdown.Item>
			</Dropdown>
		</div>
	);
}
export default TableAction;
