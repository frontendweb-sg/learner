import SubmitButton from "@/components/common/SubmitButton";
import Box from "@/components/ui/Box";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Link from "next/link";

/**
 * Login form component
 * @returns
 */
function LoginForm() {
	return (
		<Box as="form" noValidate className="w-80 space-y-4">
			<Box as="div" className="mb-8">
				<h1 className="mb-2 text-2xl font-semibold">Login</h1>
				<p className="text-xs text-slate-800">
					If you don{"'t"} have an account, please click{" "}
					<Link href="/signup">Register</Link>
				</p>
			</Box>
			<Input name="email" className="shadow-sm" placeholder="Email/Mobile" />
			<Input name="description" className="shadow-sm" placeholder="Password" />
			<SubmitButton>Login</SubmitButton>
		</Box>
	);
}

export default LoginForm;
