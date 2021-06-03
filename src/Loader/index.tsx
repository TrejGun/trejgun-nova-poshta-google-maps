import React, {useEffect, useState, FC} from "react";

import {useLoadScript} from "@react-google-maps/api";

import {Map} from "../Map";
import {callAPI} from "./utils";
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

export const MapLoader: FC<IMapLoaderProps> = props => {
  const {
    onSelect,
    onError,
    language = Languages.ua,
    googleMapsApiKey,
    novaPoshtaApiKey,
    className,
    getCoordinates,
    zoom = 14,
    options,
    children,
  } = props;
  const [warehouseData, setWarehouseData] = useState([]);
  const [warehouseTypesData, setWarehouseTypesData] = useState([]);

  useEffect(() => {
    callAPI({
      apiKey: novaPoshtaApiKey,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        Language: language,
      },
    })
      .then(setWarehouseData)
      .catch(onError);
  }, []);

  useEffect(() => {
    callAPI({
      language,
      apiKey: novaPoshtaApiKey,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouseTypes",
      methodProperties: {
        Language: language,
      },
    })
      .then(setWarehouseTypesData)
      .catch(onError);
  }, []);

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey,
    language,
  });

  if (loadError) {
    onError(loadError);
  }

  if (!isLoaded || !warehouseData.length || !warehouseTypesData.length) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Map
      getCoordinates={getCoordinates}
      className={className}
      onError={onError}
      onSelect={onSelect}
      options={options}
      zoom={zoom}
      warehouseData={warehouseData}
      warehouseTypesData={warehouseTypesData}
    />
  );
};
