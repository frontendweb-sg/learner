import mongoose, { Schema, Document } from "mongoose";
export const COURSE_CATEGORY_TABLE = "course-category";

export interface ICourseCategory {
	title: string;
	description: string;
	slug?: string;
	image: string;
	active: boolean;
}

export interface ICourseCategoryDoc
	extends Document<ICourseCategory>,
		ICourseCategory {}
const schema = new Schema(
	{
		title: { type: String, required: true, trim: true },
		slug: { type: String, required: true, trim: true },
		description: { type: String, default: "" },
		image: { type: String, default: "" },
		active: { type: Boolean, default: true },
	},
	{
		timestamps: true,
		id: true,
		toJSON: {
			virtuals: true,
			versionKey: false,
		},
	},
);
schema.virtual("id").get(function () {
	return this._id.toHexString();
});

export const CourseCategory =
	mongoose.models[COURSE_CATEGORY_TABLE] ||
	mongoose.model<ICourseCategory>(COURSE_CATEGORY_TABLE, schema);
