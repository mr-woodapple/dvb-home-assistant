import { css, html, LitElement } from "lit";
import { Task } from '@lit/task';
import { customElement, property } from "lit/decorators.js";
import { fetchDepartures } from "services/api-service";
import { Departure, StationMonitorRequest } from "types/types";

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
  @property({ attribute: false }) platforms: string[] = [];
  @property({ attribute: false }) retrievedDepartureLimit?: number;
  @property({ attribute: false }) displayedDepartureLimit?: number;

  private _fetchDepartures = new Task(this, {
    args: () => [this.stopId, this.retrievedDepartureLimit] as const,
    task: async ([stopId, retrievedDepartureLimit]) => await fetchDepartures({ stopId, retrievedDepartureLimit })
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
        font-weight: bold;
        font-size: var(--ha-font-size-3xl)
      }
    }

    .departures {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `

  private getPlatformFilter(): Set<string> {
    return new Set(
      this.platforms
        .map((platform) => platform.trim())
        .filter((platform) => platform.length > 0)
    );
  }

  private getDisplayedDepartureLimit(): number {
    if (this.displayedDepartureLimit === undefined || isNaN(this.displayedDepartureLimit)) {
      return 5;
    }
    const truncated = Math.trunc(this.displayedDepartureLimit);
    return truncated >= 1 ? truncated : 5;
  }

  private getDisplayedDepartures(result: StationMonitorRequest, platformFilter: Set<string>): Departure[] {
    const departures = result.Departures ?? [];
    const matchingDepartures = platformFilter.size === 0
      ? departures
      : departures.filter((departure) => {
        const platformName = departure.Platform?.Name?.trim();
        return platformName !== undefined && platformFilter.has(platformName);
      });

    return matchingDepartures.slice(0, this.getDisplayedDepartureLimit());
  }

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
                <span class="station-name">${result.Name ?? "Station unbekannt"}</span>
              </div>

              <div class="departures">
                ${this.getDisplayedDepartures(result, this.getPlatformFilter()).map(departure => html`
                  <departure-entry .departure=${departure}></departure-entry>
                `)}
                ${this.getDisplayedDepartures(result, this.getPlatformFilter()).length === 0
                  ? html`<div>${this.getPlatformFilter().size > 0
                    ? "Keine Abfahrten für die gewählten Bahnsteige."
                    : "Keine bevorstehenden Abfahrten."}</div>`
                  : ""}
              </div>
            </div>
          `,
          error: (e) => html`<div class="error">${e}</div>`
        })}
      </div>
    `
  }
}