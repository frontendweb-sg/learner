import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { deleteCategory } from "../actions/actions";
import { toast } from "react-toastify";
import { AppContent } from "@/utils/constants/content";
import { TrashIcon } from "lucide-react";

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
			<Dropdown.Item type="submit" as={Button} iconStart={TrashIcon}>
				{AppContent.delete}
			</Dropdown.Item>
		</form>
	);
}

export default CategoryDeleteButton;
