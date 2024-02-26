"use client";
import classNames from "classnames";
import Button from "./Button";
import { useToggle } from "@/hooks/useToggle";
import { ChevronDown, ChevronUp } from "lucide-react";
import { createContext, useContext } from "react";

interface IAccordionContext {
	open: boolean;
	toggle?: () => void;
}
type AccordionCommonProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};
type AccordionProps = AccordionCommonProps & {};
type AccordionTitleProps = AccordionCommonProps & { title: string };

const AccordionContext = createContext<IAccordionContext>({ open: false });

function Accordion({ children }: AccordionProps) {
	const { open, handleToggle } = useToggle();
	return (
		<AccordionContext.Provider value={{ open, toggle: handleToggle }}>
			<div
				className={classNames(
					"mb-4 rounded-md border border-gray-200/70 bg-white p-3 shadow-sm",
					open && "show",
				)}>
				{children}
			</div>
		</AccordionContext.Provider>
	);
}

export function AccordionTitle({ title, children }: AccordionTitleProps) {
	const { open, toggle } = useContext<IAccordionContext>(AccordionContext);
	return (
		<div className={"flex items-center justify-between"}>
			<h6 className="text-sm capitalize text-slate-800">{title}</h6>
			<div className="flex items-center">
				{children}
				<Button icon variant="text" size="xs" onClick={toggle}>
					{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
				</Button>
			</div>
		</div>
	);
}

type AccordionBodyProps = AccordionCommonProps & {};
export function AccordionBody({ children }: AccordionBodyProps) {
	const { open } = useContext<IAccordionContext>(AccordionContext);

	return open ? <div>{children}</div> : null;
}

export default Object.assign(Accordion, {
	Title: AccordionTitle,
	Body: AccordionBody,
});
