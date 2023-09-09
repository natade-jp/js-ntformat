import NTFormat from "./NTFormat.js";

test("NTFormat.textf", () => {
	expect(NTFormat.textf("[1234]")).toBe("[1234]");
	expect(NTFormat.textf("[%d]", 1, 2)).toBe("[1]");
	expect(NTFormat.textf("[%d %d]", 1, 2)).toBe("[1 2]");
	expect(NTFormat.textf("[%1$d %2$d]", 1, 2)).toBe("[1 2]");
	expect(NTFormat.textf("[%2$d %1$d]", 1, 2)).toBe("[2 1]");
	expect(NTFormat.textf("[%3d]", 1)).toBe("[  1]");
	expect(NTFormat.textf("[%03d]", 1)).toBe("[001]");
	expect(NTFormat.textf("[%1.1f]", 1.2)).toBe("[1.2]");
	expect(NTFormat.textf("[%1.2f]", 1.2)).toBe("[1.20]");
	expect(NTFormat.textf("[%+03d]", 1)).toBe("[+01]");
	expect(NTFormat.textf("[%+03d]", -1)).toBe("[-01]");
});

test("NTFormat.datef", () => {
	const day = new Date("2023-01-23T12:34:56+09:00");
	expect(NTFormat.datef("YYYY/MM/DD hh:mm:ss", day)).toBe("2023/01/23 12:34:56");
	expect(NTFormat.datef("YYYY-MM-DD hh:mm:ss", day, { is_utc: false })).toBe("2023-01-23 12:34:56");
	expect(NTFormat.datef("YYYY-MM-DDThh:mm:ss", day, { is_utc: true })).toBe("2023-01-23T03:34:56");
	expect(NTFormat.datef("YYYY-MM-DDThh:mm:sszzzzzz", day, { is_utc: true, timezone_minutes: 9 * 60 })).toBe(
		"2023-01-23T03:34:56+09:00"
	);
	expect(NTFormat.datef("YYYY-MM-DDThh:mm:sszzzzzz", day, { is_utc: true, timezone_minutes: -510 })).toBe(
		"2023-01-23T03:34:56-08:30"
	);
});
