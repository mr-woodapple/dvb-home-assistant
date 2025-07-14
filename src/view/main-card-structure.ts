import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./departure-monitor/departure-monitor.js";
import { Config } from "types/config/config.js";


@customElement("main-card-structure")
export class MainCardStructure extends LitElement {

  @property() config: Config | undefined;

  static styles = css`
    ha-card {
      display: flex;
    }
      
    .content-container {
      width: 100%;
      margin: 2rem;
    }
  `

  render() {
    return html`
      <ha-card>
        <ha-ripple></ha-ripple>

        <!-- Always render the title -->
        <div class="header-container">
          ${html`<h1 class="card-header">${this.config?.title}</h1>`}
        </div>

        <div class="content-container">
          <departure-monitor stopId="${this.config?.stopId}"></departure-monitor>
        </div>
      </ha-card>
    `
  }
}
