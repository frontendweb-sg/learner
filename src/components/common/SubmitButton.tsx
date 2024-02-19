"use client";
import { useFormStatus } from "react-dom";
import Button, { ButtonProps } from "../ui/Button";

export type SubmitButtonProps = ButtonProps & {};
function SubmitButton({ children, ...rest }: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending} aria-disabled={pending} type="submit" {...rest}>
			{pending ? "loading..." : children}
		</Button>
	);
}
export default SubmitButton;
