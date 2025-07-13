import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./departure-monitor.ts";


@customElement("main-card-structure")
export class MainCardStructure extends LitElement {

  @property() cardTitle?: string | "DVB Home Assistant";

  render() {
    return html`
      <ha-card>

        <!-- Always render the title -->
        <div class="header-container">
          ${html`<h1 class="card-header">${this.cardTitle}</h1>`}
        </div>

        <div class="content">
          <departure-monitor></departure-monitor>
        </div>
      </ha-card>
    `
  }
}
