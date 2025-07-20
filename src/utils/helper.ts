import { html, TemplateResult } from "lit";
import { Departure } from "types/types";

/**
 * Converts a Microsoft JSON date string to a standard JavaScript date object.
 * If pattern matching on the string fails, the standard date object is returned.
 * 
 * @param dateString The string to convert.
 * @returns Date value for the given string.
 */
export function convertMsJSONDate(dateString: string): Date {
  // Ensure the format is correct
  const match = dateString.match(/\/Date\((\d+)([+-]\d{4})?\)\//);

  if (match) {
    const timestamp = parseInt(match[1], 10);
    return new Date(timestamp);
  }

  // Return a default value if the format is incorrect
  return new Date(0);
}

/**
 * Provides a clean time string in hh:mm to be used for the UI.
 * 
 * @param dateString DateString in an Microsoft AspNetCore format
 * @returns Date string in format "HH:mm"
 */
export function getDepartureTime(dateString: string): string {
  var date = convertMsJSONDate(dateString);
  return date.toLocaleTimeString("de-DE", { hour: '2-digit', minute: '2-digit', hour12: false })
}

/**
 * Get html code with the correct css tag based on the punctuality of the departure.
 * 
 * @param departure Departure object as returned from the api.
 * @returns HTML code holding the punctuality info string. 
 */
export function getTimlinessStatus(departure?: Departure): TemplateResult {
  if (!departure) throw new Error("Departure not present, please open a GitHub issue.");
  if (!departure.RealTime) return html``;

  if (departure.State === "InTime") {
    return html`<span class="on-time"><div style="display:inline-block;width:7px;height:7px;border-radius:50%;background-color:currentColor;"></div></span>`;
  } else {
    if (!departure.ScheduledTime) throw new Error("Scheduled departure time not available.");

    var scheduledDate = convertMsJSONDate(departure.ScheduledTime);
    var realTimeDate = convertMsJSONDate(departure.RealTime);

    const diffInMin = Math.ceil((realTimeDate.getTime() - scheduledDate.getTime()) / (1000 * 60));

    if (diffInMin > 0) {
      return html`<span class="late">+${diffInMin} Min`;
    } else {
      return html`<span class="early">${diffInMin} Min`;
    }
  }
}

/**
 * Function to figure out the departure time we want to display,
 * returns text prefix and the minutes remaining. 
 * 
 * @param departure Departure object, allows handling missing realTime info with using scheduled as a fallback.
 * @returns Departure info as a text element.
 */
export function getDepartureTimeToDisplay(departure?: Departure): string {
  if (!departure) throw new Error("Departure not present, please open a GitHub issue.");

  // departure.RealTime can be null (on Alitas for example, handling this here)
  var dateString = departure.RealTime ? departure.RealTime : departure.ScheduledTime;

  var dateTime = convertMsJSONDate(dateString!).getTime();
  var now = Date.now();

  var diffInMin = Math.ceil((dateTime - now) / (1000 * 60));

  if (diffInMin > 60) {
    return getDepartureTime(dateString!);
  } else if (diffInMin < 60 && diffInMin > 0) {
    return `In ${diffInMin} Min.`
  } else if (diffInMin < 0) {
    return `Vor ${diffInMin} Min.`
  } else {
    return `Jetzt`
  }
}