export interface StationMonitorRequest {
  Name?: string | undefined;
  Status?: object | undefined;
  Place?: string | undefined;
  ExpirationTime?: string | undefined;
  Departures?: Departures[] | undefined;
}

export interface Departures {
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

export interface Platform {
  Name?: string | undefined;
  Type?: string | undefined;
}

export interface Diva {
  Number?: string | undefined;
  Network?: string | undefined;
}