import SectionForm from "@/app/admin/courses/components/SectionForm";

import Modal from "@/components/ui/Modal";

type Params = {
	slug: string;
};
function Page({ params }: { params: Params }) {
	return (
		<Modal title="Add section" open={true}>
			<SectionForm courseSlug={params.slug} />
		</Modal>
	);
}

export default Page;
