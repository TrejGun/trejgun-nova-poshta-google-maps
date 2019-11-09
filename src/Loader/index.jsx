import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useLoadScript} from "@react-google-maps/api";

import Map from "../Map";
import callAPI from "./utils";


export function MapLoader(props) {
  const {
    onSelect,
    onError,
    language = "ua",
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
    callAPI(
      {
        apiKey: novaPoshtaApiKey,
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
          Language: language,
        },
      },
      setWarehouseData,
      onError,
    )
      .then(setWarehouseData)
      .catch(onError);
  }, []);

  useEffect(() => {
    callAPI(
      {
        language,
        apiKey: novaPoshtaApiKey,
        modelName: "AddressGeneral",
        calledMethod: "getWarehouseTypes",
        methodProperties: {
          Language: language,
        },
      },
      setWarehouseTypesData,
      onError,
    )
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
}

MapLoader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onError: PropTypes.func,
  onSelect: PropTypes.func,
  language: PropTypes.oneOf(["ru", "ua"]),
  zoom: PropTypes.number,
  options: PropTypes.object,
  googleMapsApiKey: PropTypes.string,
  novaPoshtaApiKey: PropTypes.string,
  getCoordinates: PropTypes.func,
};
