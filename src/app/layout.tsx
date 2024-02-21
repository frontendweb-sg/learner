import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { poppins, roboto } from "@/utils/fonts/font";
import "react-toastify/dist/ReactToastify.css";
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
			<body className={poppins.className}>
				{children}
				<ToastContainer />
			</body>
		</html>
	);
}
