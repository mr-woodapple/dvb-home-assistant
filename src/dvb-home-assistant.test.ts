import { describe, expect, it } from "vitest";
import { DvbHomeAssistant } from "./dvb-home-assistant";

type SchemaField = { name: string; selector: Record<string, unknown> };

describe("DvbHomeAssistant.getConfigForm", () => {
  const { schema, computeLabel, computeHelper } = DvbHomeAssistant.getConfigForm();

  it("exposes the expected field names in order", () => {
    expect(schema.map((field: SchemaField) => field.name)).toEqual([
      "stopId",
      "platforms",
      "retrievedDepartureLimit",
      "displayedDepartureLimit",
      "title",
    ]);
  });

  it("uses a text selector for stopId, platforms, and title", () => {
    for (const name of ["stopId", "platforms", "title"]) {
      const field = schema.find((f: SchemaField) => f.name === name)!;
      expect(field.selector).toEqual({ text: {} });
    }
  });

  it("enforces min 1 / max 100 for retrievedDepartureLimit", () => {
    const field = schema.find((f: SchemaField) => f.name === "retrievedDepartureLimit")!;
    expect(field.selector).toEqual({ number: { min: 1, max: 100 } });
  });

  it("enforces min 1 for displayedDepartureLimit", () => {
    const field = schema.find((f: SchemaField) => f.name === "displayedDepartureLimit")!;
    expect(field.selector).toEqual({ number: { min: 1 } });
  });

  it("computes the German label for each field", () => {
    expect(computeLabel({ name: "stopId" })).toBe("Haltestellen Id");
    expect(computeLabel({ name: "platforms" })).toBe("Bahnsteige");
    expect(computeLabel({ name: "retrievedDepartureLimit" })).toBe("Abzurufende Abfahrten");
    expect(computeLabel({ name: "displayedDepartureLimit" })).toBe("Angezeigte Abfahrten");
    expect(computeLabel({ name: "title" })).toBe("Titel");
  });

  it("computes helper text only for the fields that define one", () => {
    expect(computeHelper({ name: "stopId" })).toBe(
      "Die ID für die anzuzeigenden Haltestelle findest du hier: https://github.com/mr-woodapple/dvb-home-assistant/tree/master"
    );
    expect(computeHelper({ name: "platforms" })).toBe(
      "Optional: Kommagetrennte Bahnsteig-Bezeichnungen, z. B. „1, 2, 7“. Leer lassen, um Abfahrten von allen Bahnsteigen anzuzeigen."
    );
    expect(computeHelper({ name: "retrievedDepartureLimit" })).toBe(
      "Die maximale Anzahl der abzurufenden Abfahrten ist 100. Sie sollte mindestens der Anzahl der angezeigten Abfahrten entsprechen."
    );
    expect(computeHelper({ name: "displayedDepartureLimit" })).toBeUndefined();
    expect(computeHelper({ name: "title" })).toBeUndefined();
  });
});
