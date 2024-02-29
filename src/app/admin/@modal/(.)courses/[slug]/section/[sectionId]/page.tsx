import { getSectionById } from "@/app/admin/courses/actions/section-action";
import SectionForm from "@/app/admin/courses/components/SectionForm";

import Modal from "@/components/ui/Modal";

type Params = {
	slug: string;
	sectionId: string;
};
async function Page({ params }: { params: Params }) {
	const { data: section } = await getSectionById(params.sectionId);
	return (
		<Modal title="Update section" open={true}>
			<SectionForm
				courseSlug={params.slug}
				courseId={section?.course}
				section={section!}
			/>
		</Modal>
	);
}

export default Page;
