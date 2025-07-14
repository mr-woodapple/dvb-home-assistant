import { StationMonitorRequest } from 'types/types';


interface Props {
  stopId: string;
}

/**
 * Fetch departures for a given station code from the official
 * DVB api.
 * 
 * @param stopId  
 * @returns A StationMonitorRequest object.
 */
export async function fetchDepartures({ stopId }: Props): Promise<StationMonitorRequest> {
  if (!stopId) throw new Error("Property 'stopId' is missing or empty.");
  
  const url = "https://webapi.vvo-online.de/dm"
  
  const params = new URLSearchParams();
  params.append("format", "json");
  params.append("stopId", stopId.toString());
  params.append("limit", "5"); // TODO: Make this a user input
  
  const response = await fetch(`${url}?${params.toString()}`)

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to fetch data: Network error or API unavailable.');
  }
}


export const apiReply = {
  "Name": "Bannewitzer Straße",
  "Status": {
    "Code": "Ok"
  },
  "Place": "Dresden",
  "ExpirationTime": "/Date(1752413583117+0200)/",
  "Departures": [
    {
      "Id": "voe:21066: :H:j25",
      "DlId": "de:vvo:21-66",
      "LineName": "66",
      "Direction": "Mockritz",
      "Platform": {
        "Name": "2",
        "Type": "Platform"
      },
      "Mot": "CityBus",
      "RealTime": "/Date(1752414060000-0000)/",
      "ScheduledTime": "/Date(1752414000000-0000)/",
      "State": "Delayed",
      "RouteChanges": [],
      "Diva": {
        "Number": "21066",
        "Network": "voe"
      },
      "CancelReasons": [],
      "Occupancy": "Unknown"
    },
    {
      "Id": "voe:21066: :R:j25",
      "DlId": "de:vvo:21-66",
      "LineName": "66",
      "Direction": "Nickern",
      "Platform": {
        "Name": "1",
        "Type": "Platform"
      },
      "Mot": "CityBus",
      "RealTime": "/Date(1752414420000-0000)/",
      "ScheduledTime": "/Date(1752414420000-0000)/",
      "State": "InTime",
      "RouteChanges": [],
      "Diva": {
        "Number": "21066",
        "Network": "voe"
      },
      "CancelReasons": [],
      "Occupancy": "ManySeats"
    },
    {
      "Id": "voe:21066: :H:j25",
      "DlId": "de:vvo:21-66",
      "LineName": "66",
      "Direction": "Mockritz",
      "Platform": {
        "Name": "2",
        "Type": "Platform"
      },
      "Mot": "CityBus",
      "RealTime": "/Date(1752415920000-0000)/",
      "ScheduledTime": "/Date(1752415800000-0000)/",
      "State": "Delayed",
      "RouteChanges": [],
      "Diva": {
        "Number": "21066",
        "Network": "voe"
      },
      "CancelReasons": [],
      "Occupancy": "Unknown"
    },
    {
      "Id": "voe:21066: :R:j25",
      "DlId": "de:vvo:21-66",
      "LineName": "66",
      "Direction": "Nickern",
      "Platform": {
        "Name": "1",
        "Type": "Platform"
      },
      "Mot": "CityBus",
      "RealTime": "/Date(1752416220000-0000)/",
      "ScheduledTime": "/Date(1752416220000-0000)/",
      "State": "InTime",
      "RouteChanges": [],
      "Diva": {
        "Number": "21066",
        "Network": "voe"
      },
      "CancelReasons": [],
      "Occupancy": "Unknown"
    },
    {
      "Id": "voe:21066: :H:j25",
      "DlId": "de:vvo:21-66",
      "LineName": "66",
      "Direction": "Mockritz",
      "Platform": {
        "Name": "2",
        "Type": "Platform"
      },
      "Mot": "CityBus",
      "RealTime": "/Date(1752417660000-0000)/",
      "ScheduledTime": "/Date(1752417600000-0000)/",
      "State": "Delayed",
      "RouteChanges": [],
      "Diva": {
        "Number": "21066",
        "Network": "voe"
      },
      "CancelReasons": [],
      "Occupancy": "Unknown"
    }
  ]
}