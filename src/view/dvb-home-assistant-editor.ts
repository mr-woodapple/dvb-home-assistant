import { css, html, LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { Config } from "types/config/config";
import { Hass } from "types/config/hass";


export class DvbHomeAssistantEditor extends LitElement {

  @property({ attribute: false }) hass?: Hass;
  @property({ attribute: false }) _config?: Config;

  setConfig(config: Config) {
    this._config = config;
  }

  configChanged(newConfig: Config) {
    console.log("Updated config: ", newConfig);
    // TODO: Implement logic
  }

  static styles = css`
    .card-config {
      display: flex; 
      flex-direction: column;
    }

    .helper-text {
      color: var(--secondary-text-color);
      font-size: var(--ha-font-size-s);

      &a, a:visited {
        color: var(--secondary-text-color);
      }
    }
  `

  // Render the editor ui
  render() {
    if (!this.hass || !this._config) {
      return html`
        <p>No config found, cannot show editor!</p>
      `;
    }

    return html`
      <div class="card-config">
        <h2>Allgemeine Einstellungen</h2>
      
        ${this.addTextField(
          "stopId", "Haltestellen Id", "text"
        )}
        <p class="helper-text">
          Die ID für die anzuzeigenden Haltestelle findest du so:
          <a href="https://github.com/mr-woodapple/dvb-home-assistant/tree/master" target"_blank">Klick mich</a>
        </p>
      </div>
    `
  }


  //
  // Define editor UI elements
  //

  /**
   * Adds a text field input to the editor.
   * @param name Config key
   * @param label Field label
   * @param type Input type
   * @param defaultValue Default value
   * @returns Lit template for the text field
   */
  addTextField(name: string, label?: string, type?: string, defaultValue?: string): TemplateResult {
    let value = this.getConfigValue(name as keyof Config, defaultValue);

    // Convert undefined values to empty strings for better UX
    if (value === undefined) {
      value = ''; // Empty string instead of undefined
    }

    return html`
      <ha-textfield
        name="${name}"
        label="${label}"
        type="${type ?? 'text'}"
        .value="${value}"
        @keyup="${this._valueChanged}"
        @change="${this._valueChanged}"
      ></ha-textfield>
    `;
  }


  //
  // Define helpers for setting variables
  // 

  /**
   * Handles values changes from input elements.
   * 
   * @param event Input event
   */
  _valueChanged(event: Event): void {
    if (!event.target) return;

    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const name = target.getAttribute('name');

    let value: string | boolean | number | null = target.value;
    if (!name) return;

    this.setConfigValue(name as keyof Config, value);
  }


  //
  // Define editor helper functions
  // 

  /**
   * Get the value for a given config item.
   * Is limited to the keys of the config iterface.
   * 
   * @param path 
   * @param defaultValue 
   * @returns 
   */
  getConfigValue(path: keyof Config, defaultValue?: unknown): unknown {
    if (!this._config) {
      throw new Error("Config not found.");
    }

    const value = this._config[path] ?? defaultValue;
    return value;
  }

  /**
   * Handles updating the config with the new value.
   * 
   * @param path 
   * @param value 
   */
  setConfigValue(path: keyof Config, value: unknown): unknown {
    if (!this._config) {
      throw new Error("Config not found.");
    }

    // Create a deep copy of the config
    const config: Config = { ...this._config };

    // Assign value
    (config as any)[path] = value;

    // Notify HA about the change
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: config } }))
    return;
  }
}
