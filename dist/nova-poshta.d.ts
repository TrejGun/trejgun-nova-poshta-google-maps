export declare enum Languages {
  ru = "ru",
  ua = "ua",
}
export declare enum WeekDays {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}
export declare enum WarehouseStatus {
  Working = "Working",
  InProcessOpening = "InProcessOpening",
  NotWorking = "NotWorking,",
}
export declare enum CategoryOfWarehouse {
  Postomat = "Postomat",
  Store = "Store",
  Branch = "Branch",
  MobileBranch = "MobileBranch",
}
export interface IWarehouse {
  SiteKey: string;
  Description: string;
  DescriptionRu: string;
  ShortAddress: string;
  ShortAddressRu: string;
  Phone: string;
  TypeOfWarehouse: string;
  Ref: string;
  Number: string;
  CityRef: string;
  CityDescription: string;
  CityDescriptionRu: string;
  SettlementRef: string;
  SettlementDescription: string;
  SettlementAreaDescription: string;
  SettlementRegionsDescription: string;
  SettlementTypeDescription: "місто" | "селище міського типу" | "селище" | "село";
  Longitude: string;
  Latitude: string;
  PostFinance: "0" | "1";
  BicycleParking: "0" | "1";
  PaymentAccess: "0" | "1";
  POSTerminal: "0" | "1";
  InternationalShipping: "0" | "1";
  TotalMaxWeightAllowed: string;
  PlaceMaxWeightAllowed: number;
  Reception: {
    [key in WeekDays]: string;
  };
  Delivery: {
    [key in WeekDays]: string;
  };
  Schedule: {
    [key in WeekDays]: string;
  };
  DistrictCode: string;
  WarehouseStatus: WarehouseStatus;
  CategoryOfWarehouse: CategoryOfWarehouse;
  Direct: string;
}
export interface IWarehouseType {
  Ref: string;
  Description: string;
}
