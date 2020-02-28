/// <reference types="googlemaps" />
import {FC} from "react";
import {IWarehouse, Languages} from "../nova-poshta";
interface IMapLoaderProps {
  className?: string;
  onError: (error: Error) => void;
  onSelect: (warehouse: IWarehouse) => void;
  language?: Languages;
  zoom?: number;
  options?: google.maps.MapOptions;
  googleMapsApiKey: string;
  novaPoshtaApiKey: string;
  getCoordinates: (onSuccess: (coordinate: google.maps.LatLng) => void, onError: (error: Error) => void) => void;
}
export declare const MapLoader: FC<IMapLoaderProps>;
export {};
