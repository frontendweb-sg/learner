import { PlusIcon } from "lucide-react";
import Link from "next/link";

import NavLink from "@/components/common/NavLink";
import PageTitle from "@/components/common/PageTitle";
import Col from "@/components/ui/Col";
import Divider from "@/components/ui/Divider";
import Grid from "@/components/ui/Grid";

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
	const { data: sections } = await getSections(data?.id);

	return (
		<Grid size={12}>
			<Col span={6} start={4}>
				<PageTitle
					title={data?.title}
					subtitle={`Welcome to ${data?.title.toLowerCase()}`}>
					<NavLink
						variant="text"
						size="xs"
						className="text-sm py-1"
						href={decodeURI(`/admin/courses/${data?.slug}/edit`)}>
						<PlusIcon size={16} className="mr-2" /> {AppContent.edit}
					</NavLink>
				</PageTitle>
				<Divider />
				<div className="space-y-4 mb-5">
					<p className="text-sm mb-4 mt-4">{data?.excerpt}</p>
					<p className="text-sm">{data?.description}</p>
				</div>
				<SectionList slug={data?.slug!} sections={sections! ?? []} />
			</Col>
		</Grid>
	);
}

export default Page;
