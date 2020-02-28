"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const api_1 = require("@react-google-maps/api");
const Warehouse_1 = require("../Warehouse");
const Marker_1 = require("../Marker");
exports.Map = props => {
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
//# sourceMappingURL=index.js.map