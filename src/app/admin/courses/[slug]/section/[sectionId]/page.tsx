import { ISectionDoc } from "@/app/api/models/section";

import PageTitle from "@/components/common/PageTitle";
import Col from "@/components/ui/Col";
import Divider from "@/components/ui/Divider";
import Grid from "@/components/ui/Grid";
import Panel from "@/components/ui/Panel";

import { getSectionById } from "../../../actions/section-action";
import SectionForm from "../../../components/SectionForm";

/**
 * Edit section
 * @param param0
 * @returns
 */
export default async function Page({
	params,
}: {
	params: { slug: string; sectionId: string };
}) {
	const { data } = await getSectionById(params.sectionId);
	return (
		<Grid size={12}>
			<Col start={3} span={8}>
				<Grid size={12} gap={6}>
					<Col span={8}>
						<PageTitle
							title="Edit section"
							subtitle="Welcome to section edit page"
						/>
						<SectionForm
							courseSlug={params.slug}
							section={data! as ISectionDoc}
						/>
					</Col>
					<Col span={4}>
						<Panel>
							<h2>Publish</h2>
							<Divider />
							<div>Status: pending</div>
						</Panel>
					</Col>
				</Grid>
			</Col>
		</Grid>
	);
}
