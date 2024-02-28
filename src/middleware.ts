import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		const { pathname } = req.nextUrl;
		const user = req.nextauth.token;
		console.log(pathname, "-----------USER-------------", user);
		if (pathname.startsWith("/admin") && user?.role !== "admin") {
			console.log("HI");
			return NextResponse.redirect(
				new URL(decodeURIComponent("/login?callbackUrl=" + pathname), req.url),
			);
		}

		// if (pathname.startsWith("/users") && user?.role !== "user") {
		// 	return NextResponse.redirect(
		// 		new URL(decodeURIComponent("/login?callbackUrl=" + pathname), req.url),
		// 	);
		// }
	},
	{
		callbacks: {
			authorized({ token }) {
				console.log("token", token);
				return !!token?.accessToken;
			},
		},
	},
);

export const config = {
	matcher: ["/admin/:path*", "/users/:path*"],
};
