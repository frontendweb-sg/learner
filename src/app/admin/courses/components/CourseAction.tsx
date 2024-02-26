"use client";

import { ICourseDoc } from "@/app/api/models/course";
import Button from "@/components/ui/Button";
import TableAction from "@/components/ui/DataTable/TableAction";
import Dropdown from "@/components/ui/Dropdown";
import { useAppState } from "@/context/AppContext";
import { AppContent } from "@/utils/constants/content";
import { EyeIcon, EyeOffIcon, PenIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { changeStatus, deleteCourse } from "../actions/actions";
import { toast } from "react-toastify";

export default function CourseAction({ row: { slug } }: { row: ICourseDoc }) {
	const { handleConfirm, handleConfirmCancel } = useAppState();

	const handleChange = (status: "active" | "inactive") => {
		handleConfirm!({
			onConfirm: async () => {
				const { success } = await changeStatus(slug, status);
				if (success) toast.success(`Courses ${status}`);
				handleConfirmCancel!();
			},
			title: "Update course",
			subtitle: `Are you sure, do you want to ${status} course`,
		});
	};
	return (
		<TableAction>
			<Dropdown.Item
				as={Link}
				href={`/admin/courses/${slug}/edit`}
				iconStart={PenIcon}>
				{AppContent.edit}
			</Dropdown.Item>
			<Dropdown.Item
				as={Button}
				onClick={() => {
					handleConfirm!({
						title: "Delete category",
						subtitle: "Are you sure?",
						onConfirm: async () => {
							const { success } = await deleteCourse(id);
							if (success) {
								toast.success("Category deleted!");
								handleConfirmCancel!();
							}
						},
					});
				}}
				iconStart={Trash2Icon}>
				{AppContent.delete}
			</Dropdown.Item>
			<Dropdown.Item
				as={Button}
				onClick={() => handleChange("active")}
				iconStart={EyeIcon}>
				{AppContent.active}
			</Dropdown.Item>
			<Dropdown.Item
				as={Button}
				onClick={() => handleChange("inactive")}
				iconStart={EyeOffIcon}>
				{AppContent.inactive}
			</Dropdown.Item>
		</TableAction>
	);
}
