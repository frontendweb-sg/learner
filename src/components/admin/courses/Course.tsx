import classNames from "classnames";
import { PencilIcon, ViewIcon } from "lucide-react";
import Image from "next/image";

import { ICourseDoc } from "@/app/api/models/course";

import NavLink from "@/components/common/NavLink";
import Panel, { PanelProps } from "@/components/ui/Panel";

import DeleteCourse from "./DeleteCourse";

type CourseProps = PanelProps & {
	course: ICourseDoc;
};
export default function Course({ course, className, ...rest }: CourseProps) {
	return (
		<Panel
			className={classNames(
				"rounded-md overflow-hidden group shadow-sm h-48",
				className,
			)}
			{...rest}>
			<Image
				priority
				style={{
					objectFit: "cover",
				}}
				src={course.hero ? course.hero : "/images/course-img.png"}
				alt={course.title}
				fill
			/>
			<div className="absolute top-3 px-3 left-0  w-full flex items-center justify-between invisible group-hover:visible">
				<NavLink
					variant="text"
					color="default"
					size="xs"
					icon
					href={`/admin/courses/${course.slug}`}>
					<ViewIcon size={16} />
				</NavLink>
				<div className="flex items-center space-x-1">
					<NavLink
						variant="text"
						color="default"
						size="xs"
						icon
						href={`/admin/courses/${course.slug}/edit`}>
						<PencilIcon size={16} />
					</NavLink>
					<DeleteCourse id={course.id} />
				</div>
			</div>
			<div className="absolute  text-white bottom-0 px-4 text-sm  w-full left-0 py-4">
				<h5>{course.title}</h5>
				<p className="text-[10px] leading-tight mt-2">
					{course.description.substring(0, 50)}
				</p>
			</div>
		</Panel>
	);
}
