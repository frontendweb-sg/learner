import { ColorType, SizeType } from "@/utils/types";
import classNames from "classnames";
import Image from "next/image";

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
	src?: string;
	alt?: string;
	size?: SizeType;
	color?: ColorType;
};

const AvatarSizes = {
	xs: "w-8 h-8",
	sm: "w-9 h-9",
	md: "w-11 h-11",
	lg: "w-16 h-16",
	xl: "w-20 h-20",
	"2xl": "w-28 h-28",
};

/**
 * Avatar components
 * @param param0
 * @returns
 */
const Avatar = ({
	size = "sm",
	src,
	alt,
	className,
	children,
}: AvatarProps) => {
	const classes = classNames(
		"overflow-hidden relative rounded-full",
		AvatarSizes[size as keyof typeof AvatarSizes],
		className,
	);
	return (
		<div className={classes}>
			{children ? (
				children
			) : (
				<Image fill priority src={src! ?? "/avatar.png"} alt={alt!} />
			)}
		</div>
	);
};

export default Avatar;
