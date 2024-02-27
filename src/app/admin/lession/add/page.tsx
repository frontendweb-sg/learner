import { getCourses } from "../../courses/actions/actions";
import { getSections } from "../../courses/actions/section-action";
import LessionForm from "../components/LessionForm";

export default async function Page() {
	const { data: courses } = await getCourses();
	const { data: sections } = await getSections();

	return <LessionForm courses={courses!} sections={sections!} />;
}
