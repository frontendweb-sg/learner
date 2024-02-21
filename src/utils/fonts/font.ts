import { Roboto, Lato } from "next/font/google";

export const roboto = Roboto({
	weight: ["300", "400", "500", "700", "900"],
	display: "swap",
	subsets: ["latin"],
	preload: true,
});

export const lato = Lato({
	weight: ["400", "700", "900"],
	display: "swap",
	subsets: ["latin"],
	preload: true,
});
