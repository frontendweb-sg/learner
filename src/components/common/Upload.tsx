"use client";

import classNames from "classnames";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

import Box from "../ui/Box";
import Button from "../ui/Button";

type UploadProps = React.InputHTMLAttributes<HTMLInputElement> & {
	handleFile?: (files: File[]) => void;
	as?: "img" | "video";
};
export default function Upload({
	as,
	value,
	accept = "image/png, image/jpeg",
	multiple,
	handleFile,
	className,
	...rest
}: UploadProps) {
	const inpRef = useRef<HTMLInputElement>(null);

	const [files, setFiles] = useState<File[] | string | null>(
		multiple ? ([] as File[]) : "",
	);

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const fileList = Array.from(ev.target.files!);
		if (multiple) setFiles(fileList);
		else {
			const file = URL.createObjectURL(fileList[0]);
			setFiles(file);
		}
		if (fileList?.length) handleFile?.(fileList);
	};

	const handleReset = () => {
		setFiles(multiple ? [] : "");
		inpRef.current?.form?.reset();
	};

	const classes = "overflow-hidden rounded-md relative w-full ";

	return (
		<div>
			{files && !multiple && (
				<Box as="div" className={classNames(classes, className)}>
					<Button
						icon
						size="xs"
						className="absolute z-10 hover:text-rose-600 right-3 top-3"
						onClick={handleReset}>
						<X />
					</Button>
					{as === "video" ? (
						<video src={files as string} controls />
					) : (
						<Image
							fill
							priority
							style={{
								objectFit: "contain",
							}}
							src={files as string}
							alt=""
						/>
					)}
				</Box>
			)}
			{!files && (
				<Box
					as="label"
					className={classNames(
						classes,
						"flex items-center justify-center text-xs space-x-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100",
						className,
					)}>
					<ImageIcon size={16} /> <span>Upload course hero</span>
					<input
						{...rest}
						ref={inpRef}
						className="absolute invisible"
						type="file"
						multiple={multiple}
						accept={accept}
						onChange={handleChange}
					/>
				</Box>
			)}
		</div>
	);
}
