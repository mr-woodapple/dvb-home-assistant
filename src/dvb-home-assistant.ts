import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { Config, DefaultConfig, StubConfig } from 'types/config/config.js';
import { Hass } from 'types/config/hass.js';

import "./view/main-card-structure.ts"
import { DvbHomeAssistantEditor } from 'view/dvb-home-assistant-editor.js';

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

  // Get a new instance of the editor for 
  // Home Assistants visual card editor feature.
  static getConfigElement() {
    return document.createElement('dvb-home-assistant-editor');
  }

  // Expose stub config for Home Assistants card picker preview
  static getStubConfig() {
    return StubConfig;
  }
}

// Register the editor 
// Not sure why this above the editor isn't enough: @customElement("dvb-home-assistant-editor")
customElements.define('dvb-home-assistant-editor', DvbHomeAssistantEditor)

// HACS register
window.customCards = window.customCards || [];
window.customCards.push({
  type: "dvb-home-assistant",
  name: "DVB Home Assistant",
  preview: true,
  description: "DVB & VVO Abfahrtsmonitor für Home Assistant",
  documentationURL: "https://github.com/mr-woodapple/dvb-home-assistant"
})