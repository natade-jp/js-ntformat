import NTFormat from "./NTFormat.js";

test("NTFormat.textf", () => {
	expect(NTFormat.textf("[1234]")).toBe("[1234]");
	expect(NTFormat.textf("[%d]", 1, 2)).toBe("[1]");
	expect(NTFormat.textf("[%d %d]", 1, 2)).toBe("[1 2]");
	expect(NTFormat.textf("[%3d]", 1)).toBe("[  1]");
	expect(NTFormat.textf("[%03d]", 1)).toBe("[001]");
	expect(NTFormat.textf("[%1.1f]", 1.2)).toBe("[1.2]");
	expect(NTFormat.textf("[%1.2f]", 1.2)).toBe("[1.20]");
});

test("NTFormat.datef", () => {
	const date_string = "2020-12-31T12:34:56+09:00";
	expect(NTFormat.datef("YYYY-MM-DDThh:mm:ss+09:00", new Date(date_string))).toBe(date_string);
});
