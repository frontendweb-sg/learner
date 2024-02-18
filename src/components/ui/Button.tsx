export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};
function Button({ type = "button", children, ...rest }: ButtonProps) {
	return (
		<button type={type} {...rest}>
			{children}
		</button>
	);
}
export default Button;
