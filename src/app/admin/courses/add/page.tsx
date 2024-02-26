import PageTitle from "@/components/common/PageTitle";
import CourseForm from "../components/CourseForm";
import { getCategories } from "../../category/actions/actions";
import Grid from "@/components/ui/Grid";
import Col from "@/components/ui/Col";
import Panel from "@/components/ui/Panel";
import Divider from "@/components/ui/Divider";

/**
 * Add course page
 * @returns
 */
async function Page() {
	const { data, error } = await getCategories();

	return (
		<>
			<Grid size={12}>
				<Col start={3} span={8}>
					<Grid size={12} gap={6}>
						<Col span={8}>
							<PageTitle title="Add course" subtitle="Welcome to add course" />
							<CourseForm categories={data!} />
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
	);
}
export default Page;
