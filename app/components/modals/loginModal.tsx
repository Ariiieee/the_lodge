"use client";
import { signIn } from "next-auth/react";
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
import useLoginModal from "../hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.ok) {
				toast.success("You are Logged in Successfully");
				router.refresh();
				loginModal.onClose();
			}

			if (callback?.error) {
				toast.error(callback?.error);
			}
		});
	};

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome Back!" subtitle="Sign into your Account!" />
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
				onClick={() => {}}
			/>
			<Button
				outline
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => {}}
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
			isLoading={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			onClose={loginModal.onClose}
			actionLabel="Continue"
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
