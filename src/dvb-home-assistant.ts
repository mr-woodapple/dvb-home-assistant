import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js'

import "./view/main-card-structure.ts"


@customElement('dvb-home-assistant')
export class DvbHomeAssistant extends LitElement {
  
  @property({ type: Object }) hass: any; // Home Assistant object
  @property({ type: Object }) config: any;

  render() {
    return html 
    `<main-card-structure></main-card-structure>`;
  }

  setConfig(config: any) {
    this.config = config;
  }
}

// TODO: Expose stub config for Home Assistants card picker preview

// HACS register
window.customCards = window.customCards || [];
window.customCards.push({
  type: "dvb-home-assistant",
  name: "DVB Home Assistant",
  preview: true,
  description: "DVB & VVO Abfahrtsmonitor für Home Assistant",
  documentationURL: "https://github.com/mr-woodapple/dvb-home-assistant"
})