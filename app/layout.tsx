import "./globals.css";
import { Nunito } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modal/Modal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
	title: "The Lodge",
	description: "an airbnb clone app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={nunito.className}>
				<Modal isOpen actionLabel="Submit" title="title" />
				<Navbar />
				{children}
			</body>
		</html>
	);
}
