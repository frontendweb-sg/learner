import NextAuth, { User } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

import { IUser } from "@/app/api/models/user";

declare module "next-auth" {
	interface User extends IUser {}
	interface Session {
		user: IUser & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT extends IUser {}
}
