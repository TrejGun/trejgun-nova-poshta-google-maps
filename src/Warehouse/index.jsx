import React from "react";
import PropTypes from "prop-types";
import {InfoWindow} from "@react-google-maps/api";


export default function Warehouse({warehouse, warehouseTypesData, onClose}) {
  if (!warehouse) {
    return null;
  }

  return (
    <InfoWindow
      onCloseClick={onClose}
      position={{
        lat: Number(warehouse.Latitude),
        lng: Number(warehouse.Longitude),
      }}
    >
      <div>
        <strong>
          {warehouseTypesData.find(type => type.Ref === warehouse.TypeOfWarehouse).Description} №{warehouse.Number}
        </strong>
        <div>{warehouse.ShortAddress}</div>
      </div>
    </InfoWindow>
  );
}

Warehouse.propTypes = {
  onClose: PropTypes.func,
  warehouseTypesData: PropTypes.arrayOf(
    PropTypes.shape({
      Ref: PropTypes.string,
      Description: PropTypes.string,
    }),
  ),
  warehouse: PropTypes.shape({
    TypeOfWarehouse: PropTypes.string,
    Description: PropTypes.string,
    Number: PropTypes.string,
    Latitude: PropTypes.string,
    Longitude: PropTypes.string,
    ShortAddress: PropTypes.string,
  }),
};
