import { useCallback, useState } from "react";

export type IConfirm = {
	open?: boolean;
	title: string;
	subtitle?: string;
	onConfirm: () => void;
};
export default function useConfirm() {
	const [confirm, setConfirm] = useState<IConfirm>({
		open: false,
		title: "Are you sure",
		subtitle: "Plese click on ok to submit",
		onConfirm: () => {},
	});

	const handleConfirm = useCallback(
		({ title, subtitle, onConfirm }: IConfirm) => {
			setConfirm((prev: IConfirm) => ({
				...prev,
				title,
				subtitle,
				onConfirm,
				open: true,
			}));
		},
		[],
	);

	const handleConfirmCancel = useCallback(() => {
		setConfirm((prev: IConfirm) => ({
			...prev,
			title: "Are you sure",
			subtitle: "Plese click on ok to submit",
			open: false,
		}));
	}, []);

	return {
		confirm,
		handleConfirm,
		handleConfirmCancel,
	};
}
