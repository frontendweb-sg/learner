import { Lato, Poppins, Roboto } from "next/font/google";

export const roboto = Roboto({
	weight: ["300", "400", "500", "700", "900"],
	display: "swap",
	subsets: ["latin"],
	preload: true,
	variable: "--font-roboto",
});

export const lato = Lato({
	weight: ["400", "700", "900"],
	display: "swap",
	subsets: ["latin"],
	preload: true,
	variable: "--font-lato",
});

export const poppins = Poppins({
	weight: ["400", "700", "900", "500", "600"],
	display: "swap",
	subsets: ["latin"],
	preload: true,
});
