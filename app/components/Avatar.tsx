"use client";
import Image from "next/image";

const Avatar = () => {
	return (
		<div>
			<Image
				className="rounded-full"
				height="30"
				width="30"
				src="/images/avatar/avatar.jpg"
				alt="avatar"
			/>
		</div>
	);
};

export default Avatar;
