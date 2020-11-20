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
exports.MapLoader = void 0;
const react_1 = __importStar(require("react"));
const api_1 = require("@react-google-maps/api");
const Map_1 = require("../Map");
const utils_1 = require("./utils");
const nova_poshta_1 = require("../nova-poshta");
const MapLoader = props => {
    const { onSelect, onError, language = nova_poshta_1.Languages.ua, googleMapsApiKey, novaPoshtaApiKey, className, getCoordinates, zoom = 14, options, children, } = props;
    const [warehouseData, setWarehouseData] = react_1.useState([]);
    const [warehouseTypesData, setWarehouseTypesData] = react_1.useState([]);
    react_1.useEffect(() => {
        utils_1.callAPI({
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
    react_1.useEffect(() => {
        utils_1.callAPI({
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
    const { isLoaded, loadError } = api_1.useLoadScript({
        googleMapsApiKey,
        language,
    });
    if (loadError) {
        onError(loadError);
    }
    if (!isLoaded || !warehouseData.length || !warehouseTypesData.length) {
        return react_1.default.createElement("div", { className: className }, children);
    }
    return (react_1.default.createElement(Map_1.Map, { getCoordinates: getCoordinates, className: className, onError: onError, onSelect: onSelect, options: options, zoom: zoom, warehouseData: warehouseData, warehouseTypesData: warehouseTypesData }));
};
exports.MapLoader = MapLoader;
//# sourceMappingURL=index.js.map