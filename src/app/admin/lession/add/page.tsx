import { ArrowLeftSquareIcon } from "lucide-react";

import NavLink from "@/components/common/NavLink";
import PageTitle from "@/components/common/PageTitle";
import Col from "@/components/ui/Col";
import Divider from "@/components/ui/Divider";
import Grid from "@/components/ui/Grid";

import { getCourses } from "../../courses/actions/actions";
import { getSections } from "../../courses/actions/section-action";
import LessionForm from "../components/LessionForm";

/**
 * Lession add page
 * @returns
 */
export default async function Page() {
	const { data: courses } = await getCourses();
	const { data: sections } = await getSections();
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
				<LessionForm courses={courses!} sections={sections!} />
			</Col>
		</Grid>
	);
}
