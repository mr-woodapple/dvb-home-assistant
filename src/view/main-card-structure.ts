import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./departure-monitor.ts";


@customElement("main-card-structure")
export class MainCardStructure extends LitElement {

  @property() cardTitle?: string | "DVB Home Assistant";

  static styles = css`
    ha-card {
      /* border: 2px dashed red; */
      display: flex
    }
    .content-container {
      margin: 10px
    }
  `

  render() {
    return html`
      <ha-card>
        <ha-ripple></ha-ripple>

        <!-- Always render the title -->
        <div class="header-container">
          ${html`<h1 class="card-header">${this.cardTitle}</h1>`}
        </div>

        <div class="content-container">
          <departure-monitor></departure-monitor>
        </div>
      </ha-card>
    `
  }
}
