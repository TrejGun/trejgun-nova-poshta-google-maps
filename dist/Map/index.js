"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map = void 0;
const react_1 = __importStar(require("react"));
const api_1 = require("@react-google-maps/api");
const Warehouse_1 = require("../Warehouse");
const Marker_1 = require("../Marker");
const Map = props => {
    const { className, onError, onSelect, warehouseData, warehouseTypesData, getCoordinates, options, zoom } = props;
    const [warehouse, setWarehouse] = react_1.useState(null);
    const [coordinates, setCoordinates] = react_1.useState();
    react_1.useEffect(() => {
        getCoordinates(setCoordinates, onError);
    }, []);
    const onClose = () => setWarehouse(null);
    if (!coordinates) {
        return null;
    }
    return (react_1.default.createElement(api_1.GoogleMap, { mapContainerClassName: className, center: coordinates, zoom: zoom, options: options },
        react_1.default.createElement(Warehouse_1.Warehouse, { warehouseTypesData: warehouseTypesData, warehouse: warehouse, onClose: onClose }),
        react_1.default.createElement(api_1.MarkerClusterer, { options: {
                imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
            } }, (clusterer) => warehouseData.map(warehouse => (react_1.default.createElement(Marker_1.MemoMarker, { key: warehouse.Ref, position: {
                lat: Number(warehouse.Latitude),
                lng: Number(warehouse.Longitude),
            }, clusterer: clusterer, onClick: () => {
                onSelect(warehouse);
                setWarehouse(warehouse);
            } }))))));
};
exports.Map = Map;
//# sourceMappingURL=index.js.map