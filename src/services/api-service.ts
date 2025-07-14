import { StationMonitorRequest } from 'types/types';


interface Props {
  stopId?: string | undefined;
}

/**
 * Fetch departures for a given station code from the official
 * DVB api.
 * 
 * @param stopId  
 * @returns A StationMonitorRequest object.
 */
export async function fetchDepartures({ stopId }: Props): Promise<StationMonitorRequest> {
  // TODO: Build proper logic to decide when an error needs to be thrown
  if (true) {
    console.log("Running api request for station with id: ", stopId)
    return apiReply;
  }

  throw new Error('Failed to load data: Network error or API unavailable.');
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