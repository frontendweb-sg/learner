import PageTitle from "@/components/common/PageTitle";
import Upload from "@/components/common/Upload";
import Col from "@/components/ui/Col";
import Divider from "@/components/ui/Divider";
import Grid from "@/components/ui/Grid";
import Panel from "@/components/ui/Panel";

import { getCategories } from "../../category/actions/actions";
import CourseForm from "../components/CourseForm";

/**
 * Add course page
 * @returns
 */
async function Page() {
	const { data } = await getCategories();

	return (
		<>
			<Grid size={12}>
				<Col start={3} span={8}>
					<PageTitle title="Add course" subtitle="Welcome to add course" />
					<Grid size={12} gap={6}>
						<Col span={8}>
							<CourseForm categories={data!} />
						</Col>
						<Col span={4} className="space-y-4">
							<Panel>
								<h2>Publish</h2>
								<Divider />
								<Upload name="imageUrl" />
							</Panel>

							<Panel>
								<h2>Publish</h2>
								<Divider />
								<Upload name="videoUrl" as="video" accept="video/*" />
							</Panel>
						</Col>
					</Grid>
				</Col>
			</Grid>
		</>
	);
}
export default Page;
