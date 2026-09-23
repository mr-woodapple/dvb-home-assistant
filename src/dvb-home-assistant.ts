import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { Config, DefaultConfig, StubConfig } from 'types/config/config.js';
import { Hass } from 'types/config/hass.js';

import "./view/main-card-structure.ts"

/**
 * Entry element for the Lovelace card.
 */
@customElement('dvb-home-assistant')
export class DvbHomeAssistant extends LitElement {

  @property({ attribute: false }) hass?: Hass; // Home Assistant object
  @property({ attribute: false }) config: Config = { ...DefaultConfig };

  render() {
    return html`
    <main-card-structure
      .config=${this.config}
    ></main-card-structure>`;
  }

  setConfig(config: Config) {
    if (!config) {
      throw new Error("Config missing, but needs to be provided.")
    }
    this.config = config;
  }

  // Declarative config form for Home Assistants visual card editor feature.
  static getConfigForm() {
    return {
      schema: [
        { name: "stopId", selector: { text: {} } },
        { name: "platforms", selector: { text: {} } },
        { name: "retrievedDepartureLimit", selector: { number: { min: 1, max: 100 } } },
        { name: "displayedDepartureLimit", selector: { number: { min: 1 } } },
        { name: "title", selector: { text: {} } },
      ],
      computeLabel: (schema: { name: string }) => {
        switch (schema.name) {
          case "stopId": return "Haltestellen Id";
          case "platforms": return "Bahnsteige";
          case "retrievedDepartureLimit": return "Abzurufende Abfahrten";
          case "displayedDepartureLimit": return "Angezeigte Abfahrten";
          case "title": return "Titel";
          default: return schema.name;
        }
      },
      computeHelper: (schema: { name: string }) => {
        switch (schema.name) {
          case "stopId":
            return "Die ID für die anzuzeigenden Haltestelle findest du hier: https://github.com/mr-woodapple/dvb-home-assistant/tree/master";
          case "retrievedDepartureLimit":
            return "Die maximale Anzahl der abzurufenden Abfahrten ist 100. Sie sollte mindestens der Anzahl der angezeigten Abfahrten entsprechen.";
          default:
            return undefined;
        }
      },
    };
  }

  // Expose stub config for Home Assistants card picker preview
  static getStubConfig() {
    return StubConfig;
  }
}

// HACS register
window.customCards = window.customCards || [];
window.customCards.push({
  type: "dvb-home-assistant",
  name: "DVB Home Assistant",
  preview: true,
  description: "DVB & VVO Abfahrtsmonitor für Home Assistant",
  documentationURL: "https://github.com/mr-woodapple/dvb-home-assistant"
})