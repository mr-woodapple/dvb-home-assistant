import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('dvb-home-assistant')
export class DvbHomeAssistant extends LitElement {

  @property({ type: Object }) config: any;

  render() {
    return html 
    `
    <div>
      <p>Welcome to DVB Home Assistant!</p>
    </div>
    `;
  }

  setConfig(config: any) {
    this.config = config;
  }
}

/**
 * Register element with HA
 */
customElements.define('dvb-home-assistant', DvbHomeAssistant);