import mongoose, { Document, Schema } from "mongoose";

import { Role } from "@/utils/enums";

export const USER_TABLE = "user";

export interface IUser {
	name: string;
	email: string;
	password?: string;
	role: string;
	enum: Role;
}

export interface IUserDoc extends Document<IUser>, IUser {}

const schema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, default: "user", enum: Role },
});
export const User =
	mongoose.models[USER_TABLE] || mongoose.model<IUserDoc>(USER_TABLE, schema);
