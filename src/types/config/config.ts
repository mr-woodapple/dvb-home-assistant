export interface Config {
  title?: string,
  stopId?: string,
}

/**
 * The standard (empty) config.
 */
export const DefaultConfig: Config = {
  title: undefined,
  stopId: undefined,
}

/**
 * Stub config to be used for HomeAssistants preview feature.
 */
export const StubConfig: Config = {
  stopId: "33000037" // Postplatz, Dresden
}