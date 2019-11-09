import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {GoogleMap, Marker, MarkerClusterer} from "@react-google-maps/api";
import Warehouse from "../Warehouse";


export default function Map(props) {
  const {className, onError, onSelect, warehouseData, warehouseTypesData, getCoordinates, options, zoom} = props;
  const [warehouse, setWarehouse] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    getCoordinates(setCoordinates, onError);
  }, [getCoordinates]);

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
        {clusterer =>
          warehouseData.map(warehouse => (
            <Marker
              key={warehouse.Ref}
              position={{
                lat: Number(warehouse.Latitude),
                lng: Number(warehouse.Longitude),
              }}
              clusterer={clusterer}
              onClick={() => {
                onSelect(warehouse);
                setWarehouse(warehouse);
              }}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  );
}

Map.propTypes = {
  className: PropTypes.string,
  onError: PropTypes.func,
  onSelect: PropTypes.func,
  zoom: PropTypes.number,
  options: PropTypes.object,
  warehouseData: PropTypes.arrayOf(
    PropTypes.shape({
      Ref: PropTypes.string,
      Latitude: PropTypes.string,
      Longitude: PropTypes.string,
    }),
  ),
  warehouseTypesData: PropTypes.arrayOf(
    PropTypes.shape({
      Ref: PropTypes.string,
      Description: PropTypes.string,
    }),
  ),
  getCoordinates: PropTypes.func,
};
