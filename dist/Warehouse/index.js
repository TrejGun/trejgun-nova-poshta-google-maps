"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warehouse = void 0;
const react_1 = __importDefault(require("react"));
const api_1 = require("@react-google-maps/api");
const Warehouse = props => {
    var _a;
    const { warehouse, warehouseTypesData, onClose } = props;
    if (!warehouse) {
        return null;
    }
    return (react_1.default.createElement(api_1.InfoWindow, { onCloseClick: onClose, position: {
            lat: Number(warehouse.Latitude),
            lng: Number(warehouse.Longitude),
        } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, (_a = warehouseTypesData.find(type => type.Ref === warehouse.TypeOfWarehouse)) === null || _a === void 0 ? void 0 :
                _a.Description,
                " \u2116",
                warehouse.Number),
            react_1.default.createElement("div", null, warehouse.ShortAddress))));
};
exports.Warehouse = Warehouse;
//# sourceMappingURL=index.js.map