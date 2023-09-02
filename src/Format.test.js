import Format from "./Format.js";

test("Format.textf", () => {
	expect(Format.textf("[1234]")).toBe("[1234]");
	expect(Format.textf("[%d]", 1, 2)).toBe("[1]");
	expect(Format.textf("[%d %d]", 1, 2)).toBe("[1 2]");
	expect(Format.textf("[%3d]", 1)).toBe("[  1]");
	expect(Format.textf("[%03d]", 1)).toBe("[001]");
	expect(Format.textf("[%1.1f]", 1.2)).toBe("[1.2]");
	expect(Format.textf("[%1.2f]", 1.2)).toBe("[1.20]");
});

test("Format.datef", () => {
	const date_string = "2020-12-31T12:34:56+09:00";
	expect(Format.datef("YYYY-MM-DDThh:mm:ss+09:00", new Date(date_string))).toBe(date_string);
});
