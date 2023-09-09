"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
	const router = useRouter();
	return (
		<div className="flex flex-row justify-center items-center gap-1">
			<Image
				src={"/images/house.png"}
				alt="logo"
				className="cursor-pointer"
				height="24"
				width="24"
			/>
			<p className=" font-bold hidden md:block text-xl text-blue-600">
				The Lodge
			</p>
		</div>
	);
};

export default Logo;
