import { ArrowLeftSquareIcon } from "lucide-react";

import NavLink from "@/components/common/NavLink";
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
		<Grid size={12}>
			<Col start={4} span={6}>
				<PageTitle
					headingProps={{
						className: "text-rose-600",
					}}
					title="Add course"
					subtitle="You can create course...">
					<NavLink variant="text" size="sm" href="/admin/courses">
						<ArrowLeftSquareIcon size={16} className="mr-2" /> Back
					</NavLink>
				</PageTitle>
				<Divider className="mb-7" />
				<CourseForm categories={data!} />
			</Col>
		</Grid>
	);
}
export default Page;
