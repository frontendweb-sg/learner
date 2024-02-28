import mongoose, { Document, ObjectId, Schema } from "mongoose";

import { userRole } from "@/utils/enums";

export const USER_TABLE = "user";

export interface IUser {
	name: string;
	email: string;
	password?: string;
	role: userRole;
	active: boolean;
	mobile: string;
	providerId: string;
	provider: string;
	isAccountVerified?: boolean;
	accessToken?: string;
	refreshToken?: string;
	courses: ObjectId[];
}

export interface IUserDoc extends Document<IUser>, IUser {}

const schema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			default: userRole.user,
			enum: userRole,
		},
		mobile: { type: String },
		courses: { type: [Schema.ObjectId], default: [] },
		providerId: { type: String, default: "custom" },
		provider: { type: String, default: "custom" },
		active: { type: Boolean, default: true },
		isAccountVerified: { type: Boolean, default: false },
		accessToken: { type: String, default: "" },
		refreshToken: { type: String, default: "" },
	},
	{
		timestamps: true,
		id: true,
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform(doc, ret) {
				delete ret.password;
			},
		},
	},
);
schema.virtual("id").get(function () {
	return this._id.toHexString();
});
export const User =
	mongoose.models[USER_TABLE] || mongoose.model<IUserDoc>(USER_TABLE, schema);
