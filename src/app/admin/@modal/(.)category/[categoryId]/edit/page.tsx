import { getCategoryById } from "@/app/admin/category/actions/actions";
import CategoryForm from "@/app/admin/category/components/CategoryForm";
import Modal from "@/components/ui/Modal";

export default async function PhotoModal({
	params,
}: {
	params: { categoryId: string };
}) {
	const category = await getCategoryById(params.categoryId);

	return (
		<Modal title="Add category" open={true}>
			<CategoryForm category={category} />
		</Modal>
	);
}
