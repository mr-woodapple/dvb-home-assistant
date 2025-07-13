import { css, html, LitElement } from "lit";
import { Task } from '@lit/task';
import { customElement, property } from "lit/decorators.js";
import { fetchDepartures } from "services/api-service";
import { StationMonitorRequest } from "types/types";


@customElement("departure-monitor")
export class DepartureMonitor extends LitElement {

  @property() stationCode?: string;

  private _fetchDepartures = new Task(this, {
    args: () => [this.stationCode],
    task: async ([stationCode]) => await fetchDepartures({ stationCode })
  })

  static styles = css`

  `

  render() {
    return html`
      <div class="departure-monitor">
        ${this._fetchDepartures.render({
          initial: () => html`<div>Loading data...</div>`,
          pending: () => html`<div>Loading data...</div>`,
          complete: (result: StationMonitorRequest) => html`
            <div>
              <h1>${result.Name ?? "Station"}</h1>
              <div class="departures">
                ${result.Departures?.map(departure => html`
                  <div class="departure">
                    ${departure.LineName}
                    ${departure.Direction}
                  </div>
                `)}
              </div>
            </div>
          `,
          error: (e) => html`<div class="error">${e}</div>`
        })}
      </div>
    `
  }
}