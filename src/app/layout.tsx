import AppProvider from "@/context/AppContext";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ConfirmDialog from "@/components/common/ConfirmDialog";

import { lato, poppins, roboto } from "@/utils/fonts/font";

import "./index.scss";

export const metadata: Metadata = {
	title: "Learner",
	generator: "frontendweb",
	creator: "FrontendWeb",
	applicationName: "Learner",
	description:
		"Learner providing technology courses for those who wants to enhance technical skills.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${poppins.className} ${lato.variable} ${roboto.variable}`}>
				<AppProvider>
					{children}
					<ToastContainer />
					<ConfirmDialog />
				</AppProvider>
			</body>
		</html>
	);
}
