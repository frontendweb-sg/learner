"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { ReactNode } from "react";

export default function AuthContext({
	children,
	session,
}: {
	children: ReactNode;
	session: any;
}) {
	return <SessionProvider {...session}> {children}</SessionProvider>;
}
