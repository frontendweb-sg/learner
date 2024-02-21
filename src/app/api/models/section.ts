import mongoose, { Schema, Document } from "mongoose";
import { COURSE_TABLE } from "./course";

export const COURSE_SECTION_TABLE = "course-section";
export interface ISection {
	course: string;
	title: string;
	slug: string;
	description: string;
	active: boolean;
}
export interface ISectionDoc extends Document<ISection>, ISection {}
const schema = new Schema(
	{
		course: { type: String, ref: COURSE_TABLE },
		title: { type: String, required: true, trim: true },
		slug: { type: String, required: true },
		description: { type: String },
		active: { type: Boolean, default: true },
	},
	{
		timestamps: true,
		id: true,
		toJSON: {
			versionKey: false,
			virtuals: true,
		},
	},
);
schema.virtual("id").get(function () {
	return this._id.toHexString();
});

export const CourseSection =
	mongoose.models[COURSE_SECTION_TABLE] ||
	mongoose.model<ISectionDoc>(COURSE_SECTION_TABLE, schema);
