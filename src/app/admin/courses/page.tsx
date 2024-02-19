import { ICourseDoc } from "@/app/api/models/course";
import { deleteCourse, getCourses } from "./actions/actions";
import CourseForm from "./components/CourseForm";
import Link from "next/link";
import { PencilIcon } from "lucide-react";
import DeleteButton from "@/components/common/DeleteButton";

async function Page() {
	const response = await getCourses();

	return (
		<div>
			<h1>COurses</h1>
			<CourseForm />
			{response.data?.length == 0 && <p>There is no course</p>}
			{response.data?.map((course: ICourseDoc) => (
				<div key={course.id}>
					{course.title}
					<Link href={`/admin/courses/${course.id}`}>
						<PencilIcon />
					</Link>
					<DeleteButton id={course.slug} formAction={deleteCourse} />
				</div>
			))}
		</div>
	);
}

export default Page;
