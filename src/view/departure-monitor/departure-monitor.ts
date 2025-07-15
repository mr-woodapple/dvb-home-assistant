import { css, html, LitElement } from "lit";
import { Task } from '@lit/task';
import { customElement, property } from "lit/decorators.js";
import { fetchDepartures } from "services/api-service";
import { StationMonitorRequest, Departure } from "types/types";

import "./departure-entry.ts"
import * as Icons from "../../assets/icons"

/**
 * Departure monitor element, queries data for a given station 
 * at the current time. Shows line, destination and time of departure.
 * 
 * @param stopId Id of the station to query data for. 
 */
@customElement("departure-monitor")
export class DepartureMonitor extends LitElement {

  @property() stopId: string = "";

  private _fetchDepartures = new Task(this, {
    args: () => [this.stopId],
    task: async ([stopId]) => await fetchDepartures({ stopId })
  })

  static styles = css`
    .station-header {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-items: center;
      margin: 0 0 2rem 0;

      .station-name {
        margin: 0;
      }
    }

    .departures {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `

  render() {
    return html`
      <div class="departure-monitor">
        ${this._fetchDepartures.render({
          initial: () => html`<div>Loading data...</div>`,
          pending: () => html`<div>Loading data...</div>`,
          complete: (result: StationMonitorRequest) => html`
            <div>
              <div class="station-header">
                <svg  xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 74 74">
                  ${Icons.Station}
                </svg>
                <h1 class="station-name">${result.Name ?? "Station unbekannt"}</h1>
              </div>

              <div class="departures">
                ${result.Departures?.map(departure => html`
                  <departure-entry .departure=${departure}></departure-entry>
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