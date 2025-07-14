import { css, html, LitElement, svg } from "lit";
import { Task } from '@lit/task';
import { customElement, property } from "lit/decorators.js";
import { fetchDepartures } from "services/api-service";
import { StationMonitorRequest, Departure } from "types/types";

import * as Icons from "../../assets/icons"
import { convertMsJSONDate } from "utils/helper";


/**
 * Departure monitor element, queries data for a given station 
 * at the current time. Shows line, destination and time of departure.
 * 
 * @param stopId Id of the station to query data for. 
 */
@customElement("departure-monitor")
export class DepartureMonitor extends LitElement {

  @property() stopId?: string;

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
                <h1 class="station-name">${result.Name ?? "Station"}</h1>
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

@customElement("departure-entry")
export class DepartureEntry extends LitElement {

  @property() departure?: Departure;

  static styles = css `
    .departure {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .content-start {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  `

  render() {
    return html`
      <div class="departure">
        <div class="content-start">
          <!-- TODO: Make these change on the vehicle type -->
          <svg height="20" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            ${Icons.CityBus}
          </svg>
          
          <div class="line-direction">
            <div>
              ${this.departure?.LineName}
              ${this.departure?.Direction}
            </div>
      
            <div>
              Steig ${this.departure?.Platform?.Name}
            </div>
          </div>
        </div>
        
        <div class="content-end">
          ${convertMsJSONDate(this.departure?.ScheduledTime!).toLocaleTimeString("de-DE", {hour: '2-digit', minute: '2-digit', hour12: false})}
        </div>
      </div>
    `
  }
}