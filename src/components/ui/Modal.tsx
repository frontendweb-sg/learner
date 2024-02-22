import { ReactNode } from "react";
import Button from "./Button";
import { X } from "lucide-react";

export type ModalProps = {
	children?: ReactNode;
	open: boolean;
	onClose?: () => void;
	title?: string;
};

function Modal({ open, children, onClose, title, ...rest }: ModalProps) {
	return (
		<>
			<div className="fixed inset-0 z-50 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<div className=" bg-white p-6">
							<Button
								className="absolute right-2 top-3 hover:text-rose-600"
								icon
								onClick={onClose}>
								<X />
							</Button>
							<div className="mb-6">
								<h5 className="before:contents-[''] relative font-semibold text-slate-700 before:absolute before:-left-6 before:h-full before:w-1 before:bg-rose-600">
									{title}
								</h5>
							</div>
							{children}
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={onClose}
				className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
			/>
		</>
	);
}

export default Modal;
