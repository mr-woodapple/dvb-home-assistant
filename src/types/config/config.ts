export interface Config {
  title?: string,
  stopId: string,
}

/**
 * The standard config (used if no config is present, for example during development outside HA).
 */
export const DefaultConfig: Config = {
  title: undefined,
  stopId: "33000037", // Postplatz, Dresden
}

/**
 * Stub config to be used for HomeAssistants preview feature.
 */
export const StubConfig: Config = {
  stopId: "33000037" // Postplatz, Dresden
}