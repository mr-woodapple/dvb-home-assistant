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

// returns a clean time string in hh:mm for the given input datestring
export function getDepartureTime(dateString: string): string {
  var date = convertMsJSONDate(dateString);
  return date.toLocaleTimeString("de-DE", {hour: '2-digit', minute: '2-digit', hour12: false})
}

// Returns the difference between two timestamps in minutes, if more than 0 add a "+", otherwise "-"
export function getTimeDifferenceInMinutes(scheduled: string, realtime: string): string {
  if (!realtime) {
    return "";
  }

  var scheduledDate = convertMsJSONDate(scheduled);
  var realTimeDate = convertMsJSONDate(realtime);

  const differenceInMinutes = Math.round((realTimeDate.getTime() - scheduledDate.getTime()) / (1000 * 60));
  
  return differenceInMinutes > 0 ? `+${differenceInMinutes}` : `${differenceInMinutes}`
}

// Returns the departure time, if less than 10 min from now show 
export function getDepartureTimeToDisplay(realTime: string): string {
  if (!realTime) {
    throw new Error("Realtime date is not available!")
  };

  var realTimeDate = convertMsJSONDate(realTime);
  var now = Date.now();
  var differenceInMinutes = Math.round((realTimeDate.getTime() - now) / (1000 * 60));

  if (differenceInMinutes > 10) {
    return getDepartureTime(realTime);
  } else if (differenceInMinutes < 30) {
    return `In ${differenceInMinutes} Min.`
  } else if (differenceInMinutes == 0) {
    return `Jetzt`
  } else if (differenceInMinutes < 0) {
    return `Vor ${differenceInMinutes} Min.`
  } 

  return 'Unbekannt'
}