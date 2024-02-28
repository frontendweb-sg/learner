import NextAuth from "next-auth";
import Credential from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";

const handler = NextAuth({
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
			id: "auth",
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
					body: JSON.stringify(credentials),
					headers: {
						"Content-Type": "application/json",
					},
				});

				const data = await response.json();
				if (response.status === 200) {
					return data;
				}

				return null;
			},
		}),
	],
	callbacks: {
		async signIn({ email, user, account, profile }) {
			console.log(email, user, account, profile);

			return true;
		},
		jwt({ account, token, user }) {
			return { ...token, ...user };
		},
		session({ token, user, session }) {
			if (session.user) {
				session.user = token;
			}
			return session;
		},
	},
});

export { handler as GET, handler as POST };
