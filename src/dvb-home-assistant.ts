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

/**
 * Register element with HA
 */
customElements.define('dvb-home-assistant', DvbHomeAssistant);