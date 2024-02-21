import PageTitle from "@/components/common/PageTitle";
import CourseForm from "../components/CourseForm";
import { getCategories } from "../../category/actions/actions";

/**
 * Add course page
 * @returns
 */
async function Page() {
	const { data, error } = await getCategories();
	return (
		<>
			{error && <p>{error.message}</p>}
			<PageTitle title="Add course" subtitle="Welcome to add course" />
			<CourseForm categories={data!} />
		</>
	);
}
export default Page;
