"use client";
import TableAction from "@/components/ui/DataTable/TableAction";
import Dropdown from "@/components/ui/Dropdown";
import Link from "next/link";
import CategoryDeleteButton from "./CategoryDeleteButton";
import Button from "@/components/ui/Button";
import { ICategoryDoc } from "@/app/api/models/category";
import { AppContent } from "@/utils/constants/content";
import { EyeIcon, EyeOffIcon, PenIcon, TrashIcon } from "lucide-react";
import { changeStatus } from "../actions/actions";
import { toast } from "react-toastify";

/**
 * Category action
 * @param param0
 * @returns
 */
function CategoryAction({ row: { id } }: { row: ICategoryDoc }) {
	return (
		<TableAction>
			<Dropdown.Item
				as={Link}
				href={`/admin/category/${id}/edit`}
				iconStart={PenIcon}>
				{AppContent.edit}
			</Dropdown.Item>
			<CategoryDeleteButton categoryId={id} />
			<Dropdown.Item
				as={Button}
				onClick={async () => {
					const { success } = await changeStatus(id, "active");
					if (success) toast.success("Category activate");
				}}
				iconStart={EyeIcon}>
				{AppContent.active}
			</Dropdown.Item>
			<Dropdown.Item
				as={Button}
				onClick={async () => {
					const { success } = await changeStatus(id, "active");
					if (success) toast.success("Category Inactivate");
				}}
				iconStart={EyeOffIcon}>
				{AppContent.inactive}
			</Dropdown.Item>
		</TableAction>
	);
}
export default CategoryAction;
