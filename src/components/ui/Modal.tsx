"use client";
import Button from "./Button";
import { ReactNode } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export type ModalProps = {
	children?: ReactNode;
	open: boolean;
	onClose?: () => void;
	title?: string;
};

function Modal({ open, children, onClose, title, ...rest }: ModalProps) {
	const router = useRouter();
	return (
		<>
			<div className="fixed inset-0 z-50 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<div className=" bg-white p-6">
							<Button
								className="absolute right-2 top-3 hover:text-rose-600"
								icon
								onClick={onClose ? onClose : () => router.back()}>
								<X size={16} />
							</Button>
							<div className="mb-6">
								<h5 className="before:contents-[''] relative text-slate-700 before:absolute before:-left-6 before:h-full before:w-1 before:bg-rose-600">
									{title}
								</h5>
							</div>
							<div className="rounded-md bg-slate-50 p-4">{children}</div>
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={onClose}
				className="fixed inset-0 z-40  bg-gray-500 bg-opacity-75 transition-opacity"
			/>
		</>
	);
}

export default Modal;
