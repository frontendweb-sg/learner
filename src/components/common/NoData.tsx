import classNames from "classnames";
import Image from "next/image";

/**
 * No data component
 * @returns
 */
function NoData() {
	return (
		<div className={classNames("flex items-center justify-center")}>
			<Image
				priority
				src="/images/no-data.jpeg"
				width={626}
				height={417}
				alt="No data"
			/>
		</div>
	);
}

export default NoData;
