import { Metadata } from "next";
import { getCourseBySlug } from "../actions/actions";
import CourseForm from "../components/CourseForm";

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}) {
	const { data } = await getCourseBySlug(params.slug);

	return {
		title: `hi-${data.data?.title}`,
		description: data.data?.description,
	};
}

async function Page({
	params,
	searchParams,
	...rest
}: {
	params: { slug: string };
	searchParams: any;
}) {
	console.log("searchParams", searchParams, rest);
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
