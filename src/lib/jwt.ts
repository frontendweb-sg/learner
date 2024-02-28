import JWT, {
	JwtPayload,
	SignCallback,
	SignOptions,
	VerifyCallback,
	VerifyOptions,
} from "jsonwebtoken";

import { AuthError } from "@/app/api/errors";

export type JwtOption = SignOptions & {};
export const DEFAULT_OPTIONS: JwtOption = {
	expiresIn: "1h",
};
export class Jwt {
	static genToken(paylod: JwtPayload, options: JwtOption = DEFAULT_OPTIONS) {
		return JWT.sign(paylod, process.env.SECRET_KEY!, options);
	}
	static verifyToken(token: string) {
		return JWT.verify(
			token,
			process.env.SECRET_KEY!,
			({ error, decode }: any) => {
				if (error) throw new AuthError("Jwt expired");
				return decode;
			},
		);
	}
}
