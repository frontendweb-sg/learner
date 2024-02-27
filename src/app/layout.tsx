import AppProvider from "@/context/AppContext";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import type { Metadata } from "next";
import { poppins } from "@/utils/fonts/font";
import { ToastContainer } from "react-toastify";
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
				<AppProvider>
					{children}
					<ToastContainer />
					<ConfirmDialog />
				</AppProvider>
			</body>
		</html>
	);
}
