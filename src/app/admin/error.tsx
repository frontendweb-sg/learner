"use client";

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error | { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.log(error);
	}, [error]);

	return (
		<div>
			<h1>Somthing went wrong</h1>
			{JSON.stringify(error)}
		</div>
	);
}
