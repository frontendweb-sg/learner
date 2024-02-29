import { getCourseBySlug } from "@/app/admin/courses/actions/actions";
import SectionForm from "@/app/admin/courses/components/SectionForm";

import Modal from "@/components/ui/Modal";

type Params = {
	slug: string;
};
async function Page({ params }: { params: Params }) {
	const { data } = await getCourseBySlug(params.slug);
	return (
		<Modal title="Add section" open={true}>
			<SectionForm courseSlug={params.slug} courseId={data?.id} />
		</Modal>
	);
}

export default Page;
