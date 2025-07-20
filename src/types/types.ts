/**
 * Interface for the type of data received after asking for departures on
 * a certain station, including metadata and the departures.
 */
export interface StationMonitorRequest {
  Name?: string | undefined;
  Status?: object | undefined;
  Place?: string | undefined;
  ExpirationTime?: string | undefined;
  Departures?: Departure[] | undefined;
}

/**
 * Interface for a departure on a given station, 
 * including metadata on the occupancy on the vehicle or delay (for example).
 */
export interface Departure {
  Id?: string | undefined;
  DlId?: string | undefined;
  LineName?: string | undefined;
  Direction?: string | undefined;
  Platform?: Platform | undefined;
  Mot?: string | undefined;
  RealTime?: string | undefined;
  ScheduledTime?: string | undefined;
  State?: string | undefined;
  RouteChanges?: any[] | undefined;
  Diva?: Diva | undefined;
  CancelReasons?: any[] | undefined;
  Occupancy?: string | undefined;
}

/**
 * Interface for a platform (on which a bus / train leaves.)
 */
export interface Platform {
  Name?: string | undefined;
  Type?: string | undefined;
}

/**
 * Not sure what Diva is supposed to be, but it holds 
 * some kind of vehicle / service id and a code for the operator.
 */
export interface Diva {
  Number?: string | undefined;
  Network?: string | undefined;
}