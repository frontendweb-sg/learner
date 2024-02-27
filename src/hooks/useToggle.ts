import { useState } from "react";

export function useToggle() {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleToggle = () => setOpen((prev) => !prev);

	return {
		open,
		handleClose,
		handleOpen,
		handleToggle,
	};
}
