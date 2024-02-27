import Link from "next/link";

import PageTitle from "@/components/common/PageTitle";

import { AppContent } from "@/utils/constants/content";

import { getCourseBySlug } from "../actions/actions";
import { getSections } from "../actions/section-action";
import SectionList from "../components/SectionList";

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}) {
	const { data } = await getCourseBySlug(params.slug);
	return {
		title: `hi-${data?.title}`,
		description: data?.description,
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

	const { data: sections } = await getSections(params.slug);
	return (
		<>
			<PageTitle title={data?.title} subtitle="Welcome to courses">
				<Link href={decodeURI(`/admin/courses/${data?.slug}/edit-course`)}>
					{AppContent.editCourse}
				</Link>
			</PageTitle>

			<div>
				<h1>{data?.title}</h1>
				<p>{data?.description}</p>
			</div>

			<SectionList slug={data?.slug!} sections={sections!} />
		</>
	);
}

export default Page;
