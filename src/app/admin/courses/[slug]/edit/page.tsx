import PageTitle from "@/components/common/PageTitle";
import CourseForm from "../../components/CourseForm";
import { getCategories } from "../../../category/actions/actions";
import { getCourseBySlug } from "../../actions/actions";
import Grid from "@/components/ui/Grid";
import Col from "@/components/ui/Col";
import Panel from "@/components/ui/Panel";
import Divider from "@/components/ui/Divider";
import SectionList from "../../components/SectionList";
import { getSections } from "../../actions/section-action";

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
			<>
				<Grid size={12}>
					<Col start={3} span={8}>
						<Grid size={12} gap={6}>
							<Col span={8}>
								<PageTitle
									title="Edut course"
									subtitle="Welcome to add course"
								/>
								<CourseForm course={data!} categories={response.data!} />
								<Divider className="mt-7 border-slate-200" />
								<SectionList slug={params.slug} sections={sections!} />
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
			</>
		</>
	);
}
export default Page;
