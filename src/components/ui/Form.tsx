import classNames from "classnames";

export type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {};
function Form({ children, className, ...rest }: FormProps) {
	return (
		<form className={classNames("space-y-4", className)} {...rest} noValidate>
			{children}
		</form>
	);
}
export default Form;
