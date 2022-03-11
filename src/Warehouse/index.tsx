import React, { FC } from "react";
import { InfoWindow } from "@react-google-maps/api";
import { IWarehouse, IWarehouseType } from "../nova-poshta";

interface IWarehouseProps {
  warehouse: IWarehouse | null;
  warehouseTypesData: Array<IWarehouseType>;
  onClose: () => void;
}

export const Warehouse: FC<IWarehouseProps> = props => {
  const { warehouse, warehouseTypesData, onClose } = props;

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
          {warehouseTypesData.find(type => type.Ref === warehouse.TypeOfWarehouse)?.Description} №{warehouse.Number}
        </strong>
        <div>{warehouse.ShortAddress}</div>
      </div>
    </InfoWindow>
  );
};
