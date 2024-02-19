import mongoose, { Schema, Document } from "mongoose";

export const CATEGORY_TABLE = "category";
export interface ICategory {
	title: string;
	description: string;
	slug?: string;
	image: string;
	active: boolean;
}

export interface ICategoryDoc extends Document<ICategory>, ICategory {}
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

export const Category =
	mongoose.models[CATEGORY_TABLE] ||
	mongoose.model<ICategory>(CATEGORY_TABLE, schema);
