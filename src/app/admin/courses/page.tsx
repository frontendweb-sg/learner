import DeleteButton from "@/components/common/DeleteButton";
import Link from "next/link";
import PageTitle from "@/components/common/PageTitle";
import Grid from "@/components/ui/Grid";
import Course from "@/components/course/Course";
import NoData from "@/components/common/NoData";
import { ICourseDoc } from "@/app/api/models/course";
import { deleteCourse, getCourses } from "./actions/actions";
import { Metadata } from "next";
import { AppContent } from "@/utils/constants/content";
import { PlusIcon, PlusSquareIcon } from "lucide-react";
import NavLink from "@/components/common/NavLink";

/**
 * Page meta data
 */
export const metadata: Metadata = {
	title: "course pages",
};

/**
 * Course page
 * @returns
 */
async function Page() {
	const { data, error } = await getCourses();

	return (
		<>
			<PageTitle title="Courses" subtitle="Welcome to courses">
				<NavLink
					size="sm"
					variant="text"
					className="text-sm"
					href="/admin/courses/add">
					<PlusIcon size={16} className="mr-1.5" /> {AppContent.add}
				</NavLink>
			</PageTitle>
			{data?.length == 0 && <NoData />}

			<Grid size={5} gap={4}>
				{data?.map((course: ICourseDoc) => (
					<Course key={course.id} course={course}>
						<DeleteButton id={course.slug} formAction={deleteCourse} />
					</Course>
				))}
			</Grid>
		</>
	);
}

export default Page;
