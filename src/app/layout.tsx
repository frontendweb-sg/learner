import AppProvider from "@/context/AppContext";
import AuthContext from "@/context/AuthContext";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ConfirmDialog from "@/components/common/ConfirmDialog";

import { poppins } from "@/utils/fonts/font";

import "./index.scss";

export const metadata: Metadata = {
	title: "Learner",
	generator: "frontendweb",
	creator: "FrontendWeb",
	applicationName: "Learner",
	description:
		"Learner providing technology courses for those who wants to enhance technical skills.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();
	return (
		<html lang="en">
			<body className={poppins.className}>
				<AuthContext session={session}>
					<AppProvider>
						{children}
						<ToastContainer />
						<ConfirmDialog />
					</AppProvider>
				</AuthContext>
			</body>
		</html>
	);
}
