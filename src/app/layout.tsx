import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

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
			<body className={inter.className}>
				{children}
				<ToastContainer />
			</body>
		</html>
	);
}
