"use client";
import classNames from "classnames";
import { SearchIcon } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { ChangeEvent } from "react";

/**
 * Global search
 * @returns
 */
type GlobalSearchProps = {
	debounceTime?: number;
};
function GlobalSearch({ debounceTime = 300 }: GlobalSearchProps) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback(
		(ev: ChangeEvent<HTMLInputElement>) => {
			const value = ev.target.value;
			const params = new URLSearchParams(searchParams);
			if (value) {
				params.set("q", value);
			} else {
				params.delete("q");
			}
			replace(`${pathname}?${params.toString()}`);
		},
		debounceTime,
	);

	return (
		<div
			className={classNames(
				"flex items-center rounded-full bg-white pl-3 visited:bg-slate-100 hover:bg-slate-100 focus:bg-slate-100",
			)}>
			<SearchIcon size={16} className="text-slate-600" />
			<input
				className={classNames(
					"rounded-full bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-xs",
				)}
				placeholder="Search keyword..."
				name="search"
				type="search"
				defaultValue={searchParams.get("q")?.toString()}
				onChange={handleSearch}
			/>
		</div>
	);
}

export default GlobalSearch;
