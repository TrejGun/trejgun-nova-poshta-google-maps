/// <reference types="googlemaps" />
import {FC} from "react";
import {IWarehouse, IWarehouseType} from "../nova-poshta";
interface IMapProps {
  className?: string;
  onError: (error: Error) => void;
  onSelect: (warehouse: IWarehouse) => void;
  zoom?: number;
  options?: google.maps.MapOptions;
  warehouseData: Array<IWarehouse>;
  warehouseTypesData: Array<IWarehouseType>;
  getCoordinates: (onSuccess: (coordinate: google.maps.LatLng) => void, onError: (error: Error) => void) => void;
}
export declare const Map: FC<IMapProps>;
export {};
