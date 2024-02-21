import DeleteButton from "@/components/common/DeleteButton";
import CourseForm from "./components/CourseForm";
import Link from "next/link";
import PageTitle from "@/components/common/PageTitle";
import { ICourseDoc } from "@/app/api/models/course";
import { deleteCourse, getCourses } from "./actions/actions";
import { PencilIcon } from "lucide-react";
import { Metadata } from "next";
import { AppContent } from "@/utils/constants/content";
import Box from "@/components/ui/Box";
import Course from "@/components/course/Course";
import Grid from "@/components/ui/Grid";

export const metadata: Metadata = {
	title: "course pages",
};
async function Page() {
	const response = await getCourses();

	return (
		<>
			<PageTitle title="Courses" subtitle="Welcome to courses">
				<Link href={`/admin/courses/add-course`}>{AppContent.addCourse}</Link>
			</PageTitle>

			{response.data?.length == 0 && <p>There is no course</p>}
			<Grid size={5} gap={4}>
				{response.data?.map((course: ICourseDoc) => (
					<Course key={course.id} course={course} />
				))}
			</Grid>
		</>
	);
}

export default Page;
