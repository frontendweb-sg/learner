import { getCourseBySlug } from "../actions/actions";

async function Page({ params }: { params: { slug: string } }) {
	const course = await getCourseBySlug(params.slug);
	return <div>Course detail {JSON.stringify(course)}</div>;
}

export default Page;
