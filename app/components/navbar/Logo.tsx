"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
	const router = useRouter();
	return (
		<div className="flex flex-row justify-center items-center gap-1">
			<Image
				src={"/images/lodgelogo.png"}
				alt="logo"
				className="hidden md:block cursor-pointer"
				height="30"
				width="30"
			/>
			<p className="font-bold text-xl text-rose-500">The Lodge</p>
		</div>
	);
};

export default Logo;
