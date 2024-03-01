"use client";

import Editor, { EditorProps } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useState } from "react";

import Select from "../ui/Select";

const languages = [
	{ label: "Html", value: "html" },
	{ label: "Javascript", value: "javascript" },
	{ label: "Typescript", value: "typescript" },
	{ label: "Json", value: "json" },
	{ label: "Css", value: "css" },
	{ label: "Less", value: "less" },
	{ label: "Scss", value: "scss" },
];
/**
 * Code editor
 * @returns
 */
type CodeEditor = EditorProps & {
	label?: string;
	name: string;
};
function CodeEditor({
	label,
	language = "javascript",
	height = 170,
	defaultValue,
	options,
	name,
	onChange,
	...rest
}: CodeEditor) {
	const [theme, setTheme] = useState("dark");
	const [lang, setLang] = useState(language);
	const [data, setData] = useState(defaultValue);

	const handleChange = (
		value: string | undefined,
		ev: editor.IModelContentChangedEvent,
	) => {
		setData(value);
		onChange?.(value, ev);
	};

	return (
		<>
			<textarea hidden name={name} value={data} onChange={() => {}} />

			<div className="flex justify-between items-center mb-2">
				{label && (
					<span className="block text-xs font-medium text-slate-500">
						{label}
					</span>
				)}
				<Select
					className="p-1"
					options={languages}
					onChange={({ target }) => setLang(target.value)}
					getValue={(option) => option.value}
				/>
			</div>
			<div className="border border-slate-100 rounded-md overflow-hidden ">
				<Editor
					height={height}
					language={lang}
					onChange={handleChange}
					options={{ minimap: { enabled: false }, ...options }}
					{...rest}
				/>
			</div>
		</>
	);
}

export default CodeEditor;
