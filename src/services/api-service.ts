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


  if (true) {
    const response = await fetch(`${url}?${params.toString()}`)

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch data: Network error or API unavailable.');
    }
  }

  // Return mock api during development
  return MockApiReplyWithDelay;
}



export const MockApiReply = {
  "Name": "Bannewitzer Straße",
  "Status": {
    "Code": "Ok"
  },
  "Place": "Dresden",
  "ExpirationTime": "/Date(1752413583117+0200)/",
  "Departures": [
    {
      "Id": "ddb:92D08: :R:j25",
      "DlId": "de:vvo:1-8",
      "LineName": "S8",
      "Direction": "Pulsnitz Bahnhof",
      "Platform": {
        "Name": "10",
        "Type": "Railtrack"
      },
      "Mot": "SuburbanRailway",
      "RealTime": "/Date(1752611700000-0000)/",
      "ScheduledTime": "/Date(1752611700000-0000)/",
      "State": "InTime",
      "RouteChanges": [
        "23415"
      ],
      "Diva": {
        "Number": "92D08",
        "Network": "ddb"
      },
      "CancelReasons": [],
      "Occupancy": "Unknown"
    },
    {
      "Id": "voe:11011: :R:j25",
      "DlId": "de:vvo:11-11",
      "LineName": "11",
      "Direction": "Bühlau",
      "Platform": {
        "Name": "7",
        "Type": "Platform"
      },
      "Mot": "Tram",
      "RealTime": "/Date(1752607740000-0000)/",
      "ScheduledTime": "/Date(1752607740000-0000)/",
      "State": "InTime",
      "RouteChanges": [
        "23520",
        "23438"
      ],
      "Diva": {
        "Number": "11011",
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
      "Mot": "PlusBus",
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
      "Mot": "HailedSharedTaxi",
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

export const MockApiReplyWithDelay = {
  "Name": "Postplatz",
  "Status": {
    "Code": "Ok"
  },
  "Place": "Dresden",
  "ExpirationTime": "\/Date(1752615928140+0200)\/",
  "Departures": [
    {
      "Id": "voe:11011: :R:j25",
      "DlId": "de:vvo:11-11",
      "LineName": "11",
      "Direction": "Bühlau",
      "Platform": {
        "Name": "7",
        "Type": "Platform"
      },
      "Mot": "Tram",
      "RealTime": "\/Date(1752616140000-0000)\/",
      "ScheduledTime": "\/Date(1752616140000-0000)\/",
      "State": "InTime",
      "RouteChanges": [
        "23520",
        "23438"
      ],
      "Diva": {
        "Number": "11011",
        "Network": "voe"
      },
      "CancelReasons": [],
      "Occupancy": "ManySeats"
    },
    {
      "Id": "voe:21068: :H:j25",
      "DlId": "de:vvo:21-68",
      "LineName": "68",
      "Direction": "Cossebaude",
      "Mot": "CityBus",
      "RealTime": "\/Date(1752616140000-0000)\/",
      "ScheduledTime": "\/Date(1752616140000-0000)\/",
      "State": "InTime",
      "RouteChanges": [
        "23520",
        "23472",
        "23438"
      ],
      "Diva": {
        "Number": "21068",
        "Network": "voe"
      },
      "CancelReasons": [],
      "Occupancy": "ManySeats"
    },
    {
      "Id": "voe:11007: :R:j25",
      "DlId": "de:vvo:11-7",
      "LineName": "7",
      "Direction": "Weixdorf",
      "Platform": {
        "Name": "6",
        "Type": "Platform"
      },
      "Mot": "Tram",
      "RealTime": "\/Date(1752616200000-0000)\/",
      "ScheduledTime": "\/Date(1752616140000-0000)\/",
      "State": "Delayed",
      "RouteChanges": [
        "23520",
        "23438"
      ],
      "Diva": {
        "Number": "11007",
        "Network": "voe"
      },
      "CancelReasons": [],
      "Occupancy": "ManySeats"
    },
    {
      "Id": "voe:21068: :R:j25",
      "DlId": "de:vvo:21-68",
      "LineName": "68",
      "Direction": "Goppeln",
      "Platform": {
        "Name": "5",
        "Type": "Platform"
      },
      "Mot": "CityBus",
      "RealTime": "\/Date(1752616380000-0000)\/",
      "ScheduledTime": "\/Date(1752616380000-0000)\/",
      "State": "InTime",
      "RouteChanges": [
        "23520",
        "23472",
        "23438"
      ],
      "Diva": {
        "Number": "21068",
        "Network": "voe"
      },
      "CancelReasons": [],
      "Occupancy": "NoSeats"
    },
    {
      "Id": "voe:21068: :H:j25",
      "DlId": "de:vvo:21-68",
      "LineName": "68",
      "Direction": "Waltherstr.",
      "Mot": "CityBus",
      "RealTime": "\/Date(1752617040000-0000)\/",
      "ScheduledTime": "\/Date(1752617040000-0000)\/",
      "State": "InTime",
      "RouteChanges": [
        "23520",
        "23472",
        "23438"
      ],
      "Diva": {
        "Number": "21068",
        "Network": "voe"
      },
      "CancelReasons": [],
      "Occupancy": "LessSeats"
    },
    {
      "Id": "voe:21068: :R:j25",
      "DlId": "de:vvo:21-68",
      "LineName": "68",
      "Direction": "S-Bf. Strehlen",
      "Platform": {
        "Name": "5",
        "Type": "Platform"
      },
      "Mot": "CityBus",
      "RealTime": "/Date(1752617100000-0000)/",
      "ScheduledTime": "/Date(1752617160000-0000)/",
      "State": "Delayed",
      "RouteChanges": [
        "23520",
        "23472",
        "23438"
      ],
      "Diva": {
        "Number": "21068",
        "Network": "voe"
      },
      "CancelReasons": [],
      "Occupancy": "Unknown"
    },
  ]
}