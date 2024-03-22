import { formatTime } from "./helpers";

describe("formatTime function", () => {
    test("Should add leading zeros for single-digit minutes and seconds", () => {
        expect(formatTime(0)).toBe("00:00");
        expect(formatTime(25)).toBe("00:25");
        expect(formatTime(65)).toBe("01:05");
        expect(formatTime(125)).toBe("02:05");
        expect(formatTime(3600)).toBe("60:00");
        expect(formatTime(3540)).toBe("59:00");
        expect(formatTime(61)).toBe("01:01");
    });
});