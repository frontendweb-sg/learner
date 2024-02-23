import PageTitle from "@/components/common/PageTitle";
import CourseForm from "../components/CourseForm";
import { getCategories } from "../../category/actions/actions";
import Grid from "@/components/ui/Grid";
import Col from "@/components/ui/Col";
import Panel from "@/components/ui/Panel";

/**
 * Add course page
 * @returns
 */
async function Page() {
	const { data, error } = await getCategories();

	return (
		<>
			{error && <p>{error.message}</p>}
			<Grid size={12}>
				<Col start={3} span={8}>
					<Grid size={12} gap={6}>
						<Col span={8}>
							<PageTitle title="Add course" subtitle="Welcome to add course" />
							<CourseForm categories={data!} />
						</Col>
						<Col span={4}>
							<Panel>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. A
								corrupti ullam eos tenetur sunt quod minima laborum suscipit?
								Voluptas excepturi modi omnis esse harum hic animi fugiat error?
								Voluptas, reiciendis?
							</Panel>
						</Col>
					</Grid>
				</Col>
			</Grid>
		</>
	);
}
export default Page;
