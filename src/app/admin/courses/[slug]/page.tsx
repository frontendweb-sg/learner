import { Metadata } from "next";
import { getCourseBySlug } from "../actions/actions";
import CourseForm from "../components/CourseForm";
import PageTitle from "@/components/common/PageTitle";
import Link from "next/link";
import { AppContent } from "@/utils/constants/content";

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
	const { data } = await getCourseBySlug(params.slug);
	return (
		<>
			<PageTitle title={data.data?.title} subtitle="Welcome to courses">
				<Link href={decodeURI(`/admin/courses/${data.data?.slug}/edit-course`)}>
					{AppContent.editCourse}
				</Link>
			</PageTitle>

			<div>
				<h1>{data.data?.title}</h1>
				<p>{data.data?.description}</p>
				{/* <CourseForm course={data.data!} /> */}

				{JSON.stringify(data.data)}
			</div>
		</>
	);
}

export default Page;
