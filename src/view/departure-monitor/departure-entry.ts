import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Departure } from "types/types";
import { getDepartureTime, getDepartureTimeToDisplay, getTimeDifferenceInMinutes } from "utils/helper";

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
      align-items: center;
      gap: 1rem;
    }

    .content-end {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  `

  render() {
    return html`
      <div class="departure">
        <div class="content-start">
          ${Icons.getVehicleIcon(this.departure?.Mot, 20)}
          
          <div class="line-direction">
            <div>
              ${this.departure?.LineName}
              ${this.departure?.Direction}
            </div>
      
            <div>
              ${getDepartureTime(this.departure?.ScheduledTime!)} Uhr
              ${this.departure?.State === "InTime" 
                ? "pünktlich" 
                : getTimeDifferenceInMinutes(this.departure?.ScheduledTime!, this.departure?.RealTime!)}
            </div>
          </div>
        </div>
        
        <div class="content-end">
          <div>
            ${getDepartureTimeToDisplay(this.departure?.RealTime!)}
          </div>

          <div>
            ${this.departure?.Platform?.Type === "Railtrack" ? "Gleis" : "Steig"} 
            ${this.departure?.Platform?.Name ?? "unbekannt"}
          </div>
        </div>
      </div>
    `
  }
}