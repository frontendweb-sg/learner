import { ArrowLeftSquareIcon } from "lucide-react";
import React from "react";

import NavLink from "@/components/common/NavLink";
import PageTitle from "@/components/common/PageTitle";
import Col from "@/components/ui/Col";
import Divider from "@/components/ui/Divider";
import Grid from "@/components/ui/Grid";

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
	const response = await getCategories(); // get categories
	const { data } = await getCourseBySlug(params.slug); // course by name
	const { data: sections } = await getSections(data?.id); // section

	return (
		<>
			<Grid size={12}>
				<Col start={4} span={6}>
					<PageTitle
						headingProps={{
							className: "text-rose-600",
						}}
						title="Edit course"
						subtitle="You can update course...">
						<NavLink variant="text" size="sm" href="/admin/courses">
							<ArrowLeftSquareIcon size={16} className="mr-2" /> Back
						</NavLink>
					</PageTitle>
					<Divider className="mb-7" />
					<CourseForm categories={response?.data!} course={data!} />
					<Grid size={12} className="mt-6">
						<Col span={8}>
							<Divider />
							<SectionList slug={params.slug} sections={sections!} />
						</Col>
					</Grid>
				</Col>
			</Grid>
		</>
	);
}
export default Page;
