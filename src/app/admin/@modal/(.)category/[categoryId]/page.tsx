import Modal from "@/components/ui/Modal";

export default function PhotoModal({
	params: { categoryId },
}: {
	params: { categoryId: string };
}) {
	return <Modal open={true}>{categoryId}</Modal>;
}
