"use client";

import { useState } from "react";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import type { Editor as IEditor } from "@ckeditor/ckeditor5-core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import type { EventInfo } from "@ckeditor/ckeditor5-utils";

type EditorProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
	label?: string;
	setValue?: (data: string) => void;
};
export default function Editor({
	label,
	name,
	defaultValue,
	setValue,
	...rest
}: EditorProps) {
	const [data, setData] = useState(defaultValue);

	const handleChange = (event: EventInfo, editor: IEditor) => {
		const data = editor.data.get();
		setData(data);
		setValue!(data);
	};

	return (
		<>
			{label && (
				<span className="block text-xs font-medium text-slate-500 mb-2">
					{label}
				</span>
			)}
			<textarea name={name} hidden value={data} onChange={() => {}} {...rest} />
			<CKEditor
				editor={ClassicEditor}
				data={(defaultValue as string) ?? (data as string)}
				onChange={handleChange}
			/>
		</>
	);
}
