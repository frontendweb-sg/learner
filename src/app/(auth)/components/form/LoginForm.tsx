"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import SubmitButton from "@/components/common/SubmitButton";
import Box from "@/components/ui/Box";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";

import { login } from "../../action/action";

/**
 * Login form component
 * @returns
 */
function LoginForm() {
	const [state, formAction] = useFormState(login, null);
	console.log("state", state);
	return (
		<Form action={formAction} noValidate className="w-80 space-y-4">
			<Box as="div" className="mb-8">
				<h1 className="mb-2 text-2xl font-semibold">Login</h1>
				<p className="text-xs text-slate-800">
					If you don{"'t"} have an account, please click{" "}
					<Link href="/signup">Register</Link>
				</p>
			</Box>
			<Input
				type="email"
				name="email"
				className="shadow-sm"
				placeholder="Email/Mobile"
				defaultValue="pradeep.kumar5@rsystems.com"
			/>
			<Input
				type="password"
				name="password"
				className="shadow-sm"
				placeholder="******"
				defaultValue="Admin@123"
			/>
			<SubmitButton>Login</SubmitButton>
		</Form>
	);
}

export default LoginForm;
