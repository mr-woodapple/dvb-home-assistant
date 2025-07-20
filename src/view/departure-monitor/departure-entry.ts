import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Departure } from "types/types";
import { getDepartureTime, getDepartureTimeToDisplay, getTimlinessStatus } from "utils/helper";

import * as Icons from "../../assets/icons"

/**
 * Custom element that holds a single departure.
 * 
 * @param departure: Departure object to render.
 */
@customElement("departure-entry")
export class DepartureEntry extends LitElement {

  @property() departure?: Departure | undefined;

  static styles = css `
    .departure {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .content-start {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
    }

    .content-end {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .line {
      margin-right: .5rem;
      font-weight: bold;
    }

    .primary-text {
      color: var(--primary-text-color);
    }

    .secondary-text {
      color: var(--secondary-text-color);
    }

    .on-time {
      color: var(--success-color);
    }

    .late {
      color: var(--error-color);
    }

    .early {
      color: var(--warning-color);
    }
  `

  render() {
    return html`
      <div class="departure">

        <div class="content-start">
          ${Icons.getVehicleIcon(this.departure?.Mot, 25)}
          
          <div>
            <div>
              <span class="primary-text line">${this.departure?.LineName}</span
              <span>${this.departure?.Direction}</span>
            </div>
      
            <div style="display: flex; flex-direction: row; align-items: center; gap: .5rem">
              <span class="secondary-text">${getDepartureTime(this.departure?.ScheduledTime!)} Uhr</span>
              
              ${getTimlinessStatus(this.departure)}
              ${this.departure?.Occupancy !== "Unknown" ? Icons.getOccupancyIcon(this.departure?.Occupancy, 15) : ""}
            </div>
          </div>
        </div>
        
        <div class="content-end">
          <div>
            ${getDepartureTimeToDisplay(this.departure)}
          </div>

          <div>
            <span class="secondary-text">
              ${this.departure?.Platform?.Type === "Railtrack" ? "Gleis" : "Steig"}
              ${this.departure?.Platform?.Name ?? "unbekannt"}
            </div>
          </div>
        </div>
      </div>
    `
  }
}