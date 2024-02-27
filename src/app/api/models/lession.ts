import mongoose, { Document, Schema } from "mongoose";

import { Status } from "@/utils/enums";

import { COURSE_TABLE } from "./course";
import { COURSE_SECTION_TABLE } from "./section";

export const LESSION_TABLE = "course-lession";
export interface IContent {
	title: string;
	content: string;
	image: string;
	code?: string;
	status: Status;
}
export interface ILession {
	course: string;
	section: string;
	title: string;
	slug: string;
	content: string;
	code?: string;
	hero?: string;
	video?: string;
	active: boolean;
	contents: IContent[];
	status: Status;
	order: number;
}
export interface ILessionDoc extends Document<ILession>, ILession {}
const schema = new Schema(
	{
		course: { type: Schema.Types.ObjectId, ref: COURSE_TABLE, required: true },
		section: {
			type: Schema.Types.ObjectId,
			ref: COURSE_SECTION_TABLE,
			required: true,
		},
		title: { type: String, required: true, trim: true },
		slug: { type: String, required: true, trim: true },
		content: { type: String, default: "" },
		code: { type: String, default: "" },
		hero: { type: String, default: "" },
		video: { type: String, default: "" },
		active: { type: Boolean, default: true },
		status: { type: String, default: Status.Draft, enum: Status },
		contents: [
			{
				title: { type: String, required: true, trim: true },
				content: { type: String, default: "" },
				image: { type: String, default: "" },
				code: { type: String, default: "" },
				status: { type: String, default: Status.Draft, enum: Status },
			},
		],
		order: { type: Number, default: 0 },
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
export const Lession =
	mongoose.models[LESSION_TABLE] ||
	mongoose.model<ILessionDoc>(LESSION_TABLE, schema);
