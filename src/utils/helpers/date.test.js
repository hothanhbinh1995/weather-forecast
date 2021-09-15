import dayjs from "dayjs";

import { dateHelpers } from ".";

jest.mock("dayjs");

describe("dateHelpers", () => {
  describe("format", () => {
    it("should return empty string when date is falsy", () => {
      const emptyStringResult = dateHelpers.format("");
      const nullResult = dateHelpers.format(null);
      const undefinedResult = dateHelpers.format(undefined);

      expect(emptyStringResult).toEqual("");
      expect(nullResult).toEqual("");
      expect(undefinedResult).toEqual("");
    });

    it("should call dayjs with correct params", () => {
      const date = "09-16-2021";
      const dateFormat = "DATE_FORMAT";

      const mockDayJSFormat = jest.fn().mockReturnValue("format");
      dayjs.mockReturnValue({
        format: mockDayJSFormat,
      });

      const result = dateHelpers.format(date, dateFormat);

      expect(dayjs).toHaveBeenCalledWith(date);
      expect(mockDayJSFormat).toHaveBeenCalledWith(dateFormat);
      expect(result).toEqual("format");
    });
  });
});
