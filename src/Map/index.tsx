import { FC, Fragment, useEffect, useState } from "react";
import { GoogleMap, MarkerClusterer } from "@react-google-maps/api";
import { Clusterer } from "@react-google-maps/marker-clusterer";

import { Warehouse } from "../Warehouse";
import { MemoMarker } from "../MemoMarker";
import { IWarehouse, IWarehouseType } from "../nova-poshta";

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

export const Map: FC<IMapProps> = props => {
  const { className, onError, onSelect, warehouseData, warehouseTypesData, getCoordinates, options, zoom } = props;
  const [warehouse, setWarehouse] = useState<IWarehouse | null>(null);
  const [coordinates, setCoordinates] = useState<google.maps.LatLng>();

  useEffect(() => {
    getCoordinates(setCoordinates, onError);
  }, []);

  const onClose = () => setWarehouse(null);

  if (!coordinates) {
    return null;
  }

  return (
    <GoogleMap mapContainerClassName={className} center={coordinates} zoom={zoom} options={options}>
      <Warehouse warehouseTypesData={warehouseTypesData} warehouse={warehouse} onClose={onClose} />
      <MarkerClusterer
        options={{
          imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        }}
      >
        {(clusterer: Clusterer) => (
          <Fragment>
            {warehouseData.map(warehouse => (
              <MemoMarker
                key={warehouse.Ref}
                position={{
                  lat: Number(warehouse.Latitude),
                  lng: Number(warehouse.Longitude),
                }}
                clusterer={clusterer}
                onClick={(): void => {
                  onSelect(warehouse);
                  setWarehouse(warehouse);
                }}
              />
            ))}
          </Fragment>
        )}
      </MarkerClusterer>
    </GoogleMap>
  );
};
