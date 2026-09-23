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
        <div class="content-container">
          ${this.config?.title ? html`<h1 class="card-header">${this.config.title}</h1>` : ""}
          <departure-monitor
            .stopId=${this.config?.stopId ?? ""}
            .platforms=${this.config?.platforms ?? ""}
            .retrievedDepartureLimit=${this.config?.retrievedDepartureLimit}
            .displayedDepartureLimit=${this.config?.displayedDepartureLimit}
          ></departure-monitor>
        </div>
      </ha-card>
    `
  }
}
