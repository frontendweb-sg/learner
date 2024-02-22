import CategoryForm from "@/app/admin/category/components/CategoryForm";
import Modal from "@/components/ui/Modal";

export default function PhotoModal() {
	return (
		<Modal title="Add category" open={true}>
			<CategoryForm />
		</Modal>
	);
}
