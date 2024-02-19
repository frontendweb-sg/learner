import { getCourseBySlug } from "../actions/actions";
import CourseForm from "../components/CourseForm";

async function Page({ params }: { params: { slug: string } }) {
	const { data } = await getCourseBySlug(params.slug);
	return (
		<div>
			<h1>{data.data?.title}</h1>
			<p>{data.data?.description}</p>
			<CourseForm course={data.data!} />

			{JSON.stringify(data.data)}
		</div>
	);
}

export default Page;
