# Replace the custom card editor with `getConfigForm`, and store `platforms` as a string

The visual editor was a hand-written `LitElement` built directly on Home Assistant's internal `ha-*` components (e.g. `ha-input`). Home Assistant explicitly documents that internal `ha-*` components are not a stable public API, so the editor could silently break on future frontend releases with no warning. We replaced it with a static `getConfigForm()` schema backed entirely by public selectors (`text`, `number`), removing the custom element, its `customElements.define` registration, and its manual change-handling code (`_valueChanged`, `setConfigValue`, `getConfigValue`).

This forced `Config.platforms` to change from `string[]` to `string`: `getConfigForm` selectors write their value straight into `config[name]` with no per-field transform hook, and a `text` selector can only ever produce a plain string. Array storage was incompatible with the public form API, so the `platforms` filter is now authored as a comma-separated string and normalized at runtime by `parsePlatformFilter`. This is a breaking change to hand-authored YAML — no automatic migration is provided.

## Considered Options

- Keep the custom editor and accept the ongoing breakage risk from depending on internal HA components — rejected, since that risk is exactly what motivated the migration.
- Keep `platforms` as `string[]` and add a custom selector or post-processing step to convert the form's string output back into an array — rejected, `getConfigForm` has no such hook, and building one would reintroduce the custom-wiring code we were trying to eliminate.
