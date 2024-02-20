import PageTitle from "@/components/common/PageTitle";
import CourseForm from "../components/CourseForm";

function Page() {
	return (
		<div>
			<PageTitle
				title="Add course"
				subtitle="Welcome to add course"></PageTitle>
			<CourseForm />
		</div>
	);
}
export default Page;
