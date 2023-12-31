"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { useState, useCallback } from "react";
import {
	FieldValue,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import useRegisterModal from "../hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import { sign } from "crypto";

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post(`./api/register`, data)
			.then(() => {
				registerModal.onClose();
			})

			.catch((error) => {
				toast.error("an error occurred, try again");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome to The Lodge"
				subtitle="Discover Unique Stays! Create an account with us!"
			/>
			<Input
				id="email"
				type="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="name"
				type="email"
				label="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				type="password"
				label="Password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => signIn("google")}
			/>
			<Button
				outline
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => signIn("github")}
			/>
			<div
				className="
					text-neutral-500
					text-center
					mt-4
					font-light
				"
			>
				<div
					className="
						flex
						justify-center
						items-center
						flex-row
						gap-2"
				>
					<div>Already have an account?</div>
					<div
						onClick={registerModal.onClose}
						className="
							text-neutral-800
							hover-underline
							cursor-pointer"
					>
						Log in
					</div>
				</div>
			</div>
		</div>
	);
	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Register"
			onClose={registerModal.onClose}
			actionLabel="Continue"
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
