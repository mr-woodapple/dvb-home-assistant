import { describe, expect, it } from "vitest";
import { parsePlatformFilter } from "./helper";

describe("parsePlatformFilter", () => {
  it("trims whitespace around each comma-separated label", () => {
    expect(parsePlatformFilter(" 1 , 2 ,3")).toEqual(new Set(["1", "2", "3"]));
  });

  it("discards blank and empty labels", () => {
    expect(parsePlatformFilter("1,,  ,2")).toEqual(new Set(["1", "2"]));
  });

  it("collapses duplicate labels into a single entry", () => {
    expect(parsePlatformFilter("7,7, 7 ,8")).toEqual(new Set(["7", "8"]));
  });

  it("returns an empty set for an empty string", () => {
    expect(parsePlatformFilter("")).toEqual(new Set());
  });

  it("returns an empty set for a string of only commas and whitespace", () => {
    expect(parsePlatformFilter(" , , ,")).toEqual(new Set());
  });
});
