"use client";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import type { Editor as IEditor } from "@ckeditor/ckeditor5-core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import type { EventInfo } from "@ckeditor/ckeditor5-utils";
import { useState } from "react";

type EditorProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {};
export default function Editor({ name, defaultValue, ...rest }: EditorProps) {
	const [data, setData] = useState(defaultValue);

	const handleChange = (event: EventInfo, editor: IEditor) => {
		const data = editor.data.get();
		setData(data);
	};

	return (
		<div className="App">
			<textarea name={name} hidden value={data} onChange={() => {}} {...rest} />
			<CKEditor
				editor={ClassicEditor}
				data={(defaultValue as string) ?? (data as string)}
				onReady={(editor: any) => {
					console.log("CKEditor5 React Component is ready to use!", editor);
				}}
				onChange={handleChange}
			/>
		</div>
	);
}
