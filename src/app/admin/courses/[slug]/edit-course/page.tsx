import PageTitle from "@/components/common/PageTitle";
import CourseForm from "../../components/CourseForm";
import { getCategories } from "../../../category/actions/actions";
import { getCourseBySlug } from "../../actions/actions";

/**
 * Add course page
 * @returns
 */
async function Page({ params }: { params: { slug: string } }) {
	const response = await getCategories();
	const course = await getCourseBySlug(params.slug);
	console.log(params);
	return (
		<>
			<PageTitle title="Edut course" subtitle="Welcome to add course" />
			<CourseForm course={course.data.data!} categories={response.data!} />
		</>
	);
}
export default Page;
