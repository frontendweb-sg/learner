export type CourseStatus = "new" | "draf" | "public";

export type ColumnProps<T, K extends keyof T> = {
	id?: string | number;
	field: K;
	headerName: string;
	render: (row: T, column: ColumnProps<T, K>, index: number) => React.ReactNode;
	valueGetter?: (row: T) => keyof T;
};

export interface TableProps<T, K extends keyof T> {
	columns?: Array<ColumnProps<T, K>>;
	rows: Array<T>;
}
