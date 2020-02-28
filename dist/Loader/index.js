"use strict";
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
Object.defineProperty(exports, "__esModule", {value: true});
const react_1 = __importStar(require("react"));
const api_1 = require("@react-google-maps/api");
const Map_1 = require("../Map");
const utils_1 = require("./utils");
const nova_poshta_1 = require("../nova-poshta");
exports.MapLoader = props => {
  const {
    onSelect,
    onError,
    language = nova_poshta_1.Languages.ua,
    googleMapsApiKey,
    novaPoshtaApiKey,
    className,
    getCoordinates,
    zoom = 14,
    options,
    children,
  } = props;
  const [warehouseData, setWarehouseData] = react_1.useState([]);
  const [warehouseTypesData, setWarehouseTypesData] = react_1.useState([]);
  react_1.useEffect(() => {
    utils_1
      .callAPI({
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
    utils_1
      .callAPI({
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
  const {isLoaded, loadError} = api_1.useLoadScript({
    googleMapsApiKey,
    language,
  });
  if (loadError) {
    onError(loadError);
  }
  if (!isLoaded || !warehouseData.length || !warehouseTypesData.length) {
    return react_1.default.createElement("div", {className: className}, children);
  }
  return react_1.default.createElement(Map_1.Map, {
    getCoordinates: getCoordinates,
    className: className,
    onError: onError,
    onSelect: onSelect,
    options: options,
    zoom: zoom,
    warehouseData: warehouseData,
    warehouseTypesData: warehouseTypesData,
  });
};
//# sourceMappingURL=index.js.map
