import bcrypt from "bcryptjs";

export class Passward {
	static hash(password: string) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
	}
	static compare(password: string, hash: string) {
		return bcrypt.compareSync(password, hash);
	}
}
