import { html, LitElement } from "lit";
import { Task } from '@lit/task';
import { customElement, property } from "lit/decorators.js";
import { fetchDepartures } from "services/api-service";
import { StationMonitorRequest } from "types/types";


@customElement("departure-monitor")
export class DepartureMonitor extends LitElement {

  @property() stationCode?: string;

  private _fetchDepartures = new Task(this, {
    task: async () => await fetchDepartures({ stationCode: this.stationCode })
  })

  render() {
    return html`
      <div class="departure-monitor">
        ${this._fetchDepartures.render({
          initial: () => html`<div>Loading data...</div>`,
          pending: () => html`<div>Loading data...</div>`,
          complete: (request: StationMonitorRequest) => html`
            <div>
              <h1>${request.Name ?? "Station"}</h1>
              <div class="departures">
                ${request.Departures?.map(departure => html`
                  <div class="departure">
                    ${departure.LineName}
                  </div>
                `)}
              </div>
            </div>
          `,
        })}
      </div>
    `
  }
}