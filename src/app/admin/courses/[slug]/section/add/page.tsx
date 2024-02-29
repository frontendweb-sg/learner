import PageTitle from "@/components/common/PageTitle";
import Col from "@/components/ui/Col";
import Divider from "@/components/ui/Divider";
import Grid from "@/components/ui/Grid";
import Panel from "@/components/ui/Panel";

import { getCourseBySlug } from "../../../actions/actions";
import SectionForm from "../../../components/SectionForm";

async function Page({ params }: { params: { slug: string } }) {
	const { data } = await getCourseBySlug(params.slug);

	return (
		<Grid size={12}>
			<Col start={3} span={8}>
				<PageTitle title="Add section" subtitle="Welcome to add section page" />
				<Grid size={12} gap={6}>
					<Col span={8}>
						<SectionForm courseSlug={params.slug} courseId={data?.id} />
					</Col>
					<Col span={4} className="space-y-4">
						<Panel>
							<h2>Publish</h2>
							<Divider />
						</Panel>
					</Col>
				</Grid>
			</Col>
		</Grid>
	);
}

export default Page;
