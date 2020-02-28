import {FC} from "react";
import {IWarehouse, IWarehouseType} from "../nova-poshta";
interface IWarehouseProps {
  warehouse: IWarehouse | null;
  warehouseTypesData: Array<IWarehouseType>;
  onClose: () => void;
}
export declare const Warehouse: FC<IWarehouseProps>;
export {};
