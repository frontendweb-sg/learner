"use client";
import { DeleteIcon } from "lucide-react";
import { deleteCategory } from "../actions/actions";
import { toast } from "react-toastify";

/**
 * Category delete button
 * @param param0
 * @returns
 */
function CategoryDeleteButton({ categoryId }: { categoryId: string }) {
	const formAction = async (formData: FormData) => {
		const confirm = window.confirm("Are you sure");
		if (confirm) {
			await deleteCategory(formData);
			toast.success("Deleted");
		}
	};

	return (
		<form action={formAction}>
			<input hidden name="id" defaultValue={categoryId} />
			<button type="submit">
				<DeleteIcon />
			</button>
		</form>
	);
}

export default CategoryDeleteButton;
