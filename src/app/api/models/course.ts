import mongoose, { Schema, Document } from "mongoose";
import { CourseStatus } from "@/utils/types";
import { COURSE_CATEGORY_TABLE } from "./category";
import { CourseLevel } from "@/utils/enums";

export const COURSE_TABLE = "Course";
export interface ICourse {
	category: string;
	author: string;
	title: string;
	slug: string;
	excerpt: string;
	level: CourseLevel;
	description: string;
	price: number;
	hero?: string;
	videoUrl?: string;
	active: boolean;
	offer?: number;
	tags: string[];
	language: string;
	ratings: number;
	status: CourseStatus;
}
export interface ICourseDoc extends Document<ICourse>, ICourse {}

const schema = new Schema(
	{
		category: { type: Schema.ObjectId, ref: COURSE_CATEGORY_TABLE },
		title: { type: String, required: true, trim: true },
		slug: { type: String, required: true, trim: true },
		excerpt: { type: String, default: "" },
		description: { type: String, default: "" },
		level: { type: String, default: CourseLevel.Beginners, enum: CourseLevel },
		hero: { type: String, default: "" },
		videoUrl: { type: String, default: "" },
		active: { type: Boolean, default: true },
		// status: { type: String, default: Status.Draft, enum: Status },
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
export const Course =
	mongoose.models[COURSE_TABLE] ||
	mongoose.model<ICourseDoc>(COURSE_TABLE, schema);

/**
 * {
 *   category:"development",
 *   title:"html",
 *   slug:"html",
 *   excerpt:"this is for beginers",
 *   level:"beginers",
 *   status:"new",
 *   description:"dfjsdfjsdl",
 *   image:"",
 *   rating:3.5
 *   author:"pradeep kumar" ,
 *   active:true
 *   language:"english"
 *   price:0 if 0 then free
 *   tags:['tech','web'],
 *   videoUrl:"",
 *   offer:5%
 * }
 */
