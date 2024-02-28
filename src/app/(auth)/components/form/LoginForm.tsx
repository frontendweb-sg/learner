"use client";

import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useFormState } from "react-dom";

import SubmitButton from "@/components/common/SubmitButton";
import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";

import { login } from "../../action/action";

/**
 * Login form component
 * @returns
 */
function LoginForm() {
	const { data: session } = useSession();
	const [state, formAction] = useFormState(login, null);
	console.log("state", state);

	const { values, handleChange, handleSubmit } = useFormik({
		initialValues: {
			email: "pradeep.kumar5@rsystems.com",
			password: "Admin@123",
		},
		async onSubmit(values, formikHelpers) {
			const result = await signIn("credentials", {
				redirect: false,
				callbackUrl: "/",
				...values,
			});
			console.log("result", result);
		},
	});

	console.log(session);
	return (
		<Form onSubmit={handleSubmit} noValidate className="w-80 space-y-4">
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
				// defaultValue="pradeep.kumar5@rsystems.com"
				onChange={handleChange}
				value={values.email}
			/>
			<Input
				type="password"
				name="password"
				className="shadow-sm"
				placeholder="******"
				// defaultValue="Admin@123"
				onChange={handleChange}
				value={values.password}
			/>
			<SubmitButton>Login</SubmitButton>

			<Button
				onClick={() =>
					signIn("github", {
						redirect: false,
					})
				}>
				Github
			</Button>
		</Form>
	);
}

export default LoginForm;
