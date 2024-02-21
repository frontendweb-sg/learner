import Col from "@/components/ui/Col";
import Grid from "@/components/ui/Grid";
import LoginForm from "../components/form/LoginForm";

function Page() {
	return (
		<Grid
			className="h-screen bg-gradient-to-l  from-yellow-500/0 to-blue-500/10 "
			size={2}>
			<Col>
				<h1>Login</h1>
			</Col>
			<Col className="flex items-center justify-center">
				<LoginForm />
			</Col>
		</Grid>
	);
}

export default Page;
