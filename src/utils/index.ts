export const slug = (title: string) => title.replace(/\s+/g, "-").toLowerCase();
export const isObjEmpty = (obj: object) =>
	Object.values(obj).length === 0 && obj.constructor === Object;
