import NextAuth from "next-auth";
import Credential from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";

import { connectDb } from "@/lib/db";

import { AuthError } from "../../errors";
import { IError } from "../../errors/custom-error";
import { IUser, IUserDoc, User } from "../../models/user";

const handler = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 1000,
	},
	jwt: {
		maxAge: 60 * 60 * 1000,
	},
	providers: [
		Github({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
		Credential({
			id: "credentials",
			credentials: {
				email: { type: "email", label: "Email", placeholder: "Enter email" },
				password: {
					type: "password",
					label: "Password",
					placeholder: "???????",
				},
			},
			async authorize(credentials, req) {
				const response = await fetch(process.env.NEXTAUTH_URL + "/login", {
					method: "POST",
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});

				const data = await response.json();
				if (response.status === 401)
					throw new AuthError((data.error as IError).message);

				if (response.status === 200) {
					return data;
				}

				return null;
			},
		}),
	],
	callbacks: {
		async signIn({ email, user, account, profile }) {
			await connectDb();

			const isUser = (await User.findOne({ email: user.email })) as IUserDoc;
			if (!isUser) {
				const newUser = new User({
					name: user.name,
					email: user.email,
					provider: account?.provider,
				});
			}
			return true;
		},
		jwt({ account, token, user, profile, session }) {
			//console.log("----", { token, user, account, profile, session });
			return { ...token, ...user };
		},
		session({ token, user, session }) {
			// console.log(session, user, token);
			session.user = token;
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
});

export { handler as GET, handler as POST };
