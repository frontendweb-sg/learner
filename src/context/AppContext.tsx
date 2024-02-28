"use client";

import useConfirm, { IConfirm } from "@/hooks/useConfirm";
import { ReactNode, createContext, useContext } from "react";

interface IAppState {
	confirm?: IConfirm;
	handleConfirm?: (confirm: IConfirm) => void;
	handleConfirmCancel?: () => void;
}
const AppContext = createContext<IAppState>({});

export default function AppProvider({ children }: { children: ReactNode }) {
	const { confirm, handleConfirm, handleConfirmCancel } = useConfirm();
	return (
		<AppContext.Provider
			value={{ confirm, handleConfirm, handleConfirmCancel }}>
			{children}
		</AppContext.Provider>
	);
}

export const useAppState = () => {
	const context = useContext(AppContext);
	if (!context) new Error("Please provide provider");
	return context;
};
