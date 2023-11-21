"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
	isOpen?: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title?: string;
	footer?: React.ReactElement;
	body?: React.ReactElement;
	actionLabel: string;
	secondaryActionLabel?: string;
	secondaryAction?: () => void;
	disabled: boolean;
	isLoading?: boolean;
}
const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	footer,
	body,
	actionLabel,
	secondaryAction,
	secondaryActionLabel,
	disabled,
	isLoading,
}) => {
	const [showModal, setShowModal] = useState(isOpen);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleModalClose = useCallback(() => {
		if (disabled) {
			return;
		}
		setShowModal(false);

		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled) {
			return;
		}

		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) {
			return;
		}
		secondaryAction();
	}, [disabled, secondaryAction]);

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className="
			flex 
			justify-center 
			items-center 
			overflow-x-hidden 
			overflow-y-auto 
			fixed 
			inset-0 z-50 
			outline-none 
			focus:outline-none 
			bg-neutral-800/70"
		>
			<div
				className="
					relative
					w-full 
					md:w-4/6 
					lg:w-3/6 
					xl:w-2/6
					my-6
					mx-auto
					h-full
					md:h-auto
					lg:h-auto
					
				"
			>
				{/* CONTENT */}
				<div
					className={`
						translate 
						duration-300 
						h-full 
						${showModal ? "translate-y-0" : "translate-y-full"}
						${showModal ? "opacity-100" : "opacity-0"}		
					`}
				>
					<div
						className="
					    translate
						  h-full 
						  lg:h-auto 
						  md:h-auto 
						  border-0 
						  rounded-lg
						  shadow-lg
						  relative 
						  flex
						  flex-col
						   w-full bg-white 
							outline-none
							 focus:outline-none
					   "
					>
						{/* header */}
						<div
							className="
							flex
							items-center
							justify-center
							p-6 rounded-t
							relative
							border-b-[1px]"
						>
							<button
								onClick={handleModalClose}
								className="
									p-1 
									border-0 
									hover:opacity-70 
									transition 
									absolute 
									left-4
								"
							>
								<IoMdClose size={18} />
							</button>
							<div className="text-lg font-semibold">{title}</div>
						</div>
						{/*BODY */}
						<div className="relative p-6 flex-auto">{body}</div>
						{/* FOOTER */}
						<div
							className="
							 relative p-6
							 flex-auto"
						>
							{footer}
						</div>
						<div className="flex flex-col p-6 gap-2">
							<div className="flex flex-row gap-4 items-center w-full">
								{secondaryAction && secondaryActionLabel && (
									<Button
										outline
										disabled={disabled}
										onClick={handleSecondaryAction}
										label={secondaryActionLabel}
									/>
								)}
								<Button
									disabled={disabled}
									onClick={handleSubmit}
									label={actionLabel}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
