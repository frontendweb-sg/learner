import upperFirst from "lodash/upperFirst";
import React from "react";

import PageTitle from "@/components/common/PageTitle";
import Col from "@/components/ui/Col";
import Divider from "@/components/ui/Divider";
import Grid from "@/components/ui/Grid";
import Panel from "@/components/ui/Panel";

import { getCategories } from "../../../category/actions/actions";
import { getCourseBySlug } from "../../actions/actions";
import { getSections } from "../../actions/section-action";
import CourseForm from "../../components/CourseForm";
import SectionList from "../../components/SectionList";

/**
 * Add course page
 * @returns
 */
async function Page({ params }: { params: { slug: string } }) {
	const response = await getCategories();
	const { data } = await getCourseBySlug(params.slug);

	const { data: sections } = await getSections(params.slug);
	return (
		<>
			<Grid size={12}>
				<Col start={3} span={8}>
					<Grid size={12} gap={6}>
						<Col span={8}>
							<PageTitle title="Edit course" subtitle="Welcome to add course" />
							<CourseForm course={data!} categories={response.data!} />
							<Divider className="mt-7 border-slate-200" />
							<SectionList slug={params.slug} sections={sections!} />
						</Col>
						<Col span={4}>
							<Panel>
								<h2>{upperFirst("Publish")}</h2>
								<Divider />
								<div>Status: pending</div>
							</Panel>
						</Col>
					</Grid>
				</Col>
			</Grid>
		</>
	);
}
export default Page;
