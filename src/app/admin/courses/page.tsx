import DeleteButton from "@/components/common/DeleteButton";
import CourseForm from "./components/CourseForm";
import Link from "next/link";
import PageTitle from "@/components/common/PageTitle";
import { ICourseDoc } from "@/app/api/models/course";
import { deleteCourse, getCourses } from "./actions/actions";
import { PencilIcon } from "lucide-react";
import { Metadata } from "next";
import { AppContent } from "@/utils/constants/content";

export const metadata: Metadata = {
	title: "course pages",
};
async function Page() {
	const response = await getCourses();

	return (
		<div>
			<h1>COurses</h1>
			<PageTitle title="Courses" subtitle="Welcome to courses">
				<Link href={`/admin/courses/add-course`}>{AppContent.addCourse}</Link>
			</PageTitle>
			<CourseForm />
			{response.data?.length == 0 && <p>There is no course</p>}
			{response.data?.map((course: ICourseDoc) => (
				<div key={course.id}>
					{course.title}
					<Link href={`/admin/courses/${course.slug}`}>
						<PencilIcon />
					</Link>
					<DeleteButton id={course.slug} formAction={deleteCourse} />
				</div>
			))}
		</div>
	);
}

export default Page;
