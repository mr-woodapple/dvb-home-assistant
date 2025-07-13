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
    const date = new Date(timestamp);
    console.log(date.toISOString()); // Outputs the ISO string representation

    return date;
  }

  // Return a default value if the format is incorrect
  return new Date(0);
}