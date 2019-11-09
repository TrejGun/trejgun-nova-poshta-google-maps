"use strict";

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.MapLoader = MapLoader;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _api = require("@react-google-maps/api");

var _Map = _interopRequireDefault(require("../Map"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (_typeof(obj) !== "object" && typeof obj !== "function")) {
    return {default: obj};
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function MapLoader(props) {
  var onSelect = props.onSelect,
    onError = props.onError,
    _props$language = props.language,
    language = _props$language === void 0 ? "ua" : _props$language,
    googleMapsApiKey = props.googleMapsApiKey,
    novaPoshtaApiKey = props.novaPoshtaApiKey,
    className = props.className,
    getCoordinates = props.getCoordinates,
    _props$zoom = props.zoom,
    zoom = _props$zoom === void 0 ? 14 : _props$zoom,
    options = props.options,
    children = props.children;

  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    warehouseData = _useState2[0],
    setWarehouseData = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    warehouseTypesData = _useState4[0],
    setWarehouseTypesData = _useState4[1];

  (0, _react.useEffect)(function() {
    (0, _utils.default)(
      {
        apiKey: novaPoshtaApiKey,
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
          Language: language,
        },
      },
      setWarehouseData,
      onError,
    )
      .then(setWarehouseData)
      .catch(onError);
  }, []);
  (0, _react.useEffect)(function() {
    (0, _utils.default)(
      {
        language: language,
        apiKey: novaPoshtaApiKey,
        modelName: "AddressGeneral",
        calledMethod: "getWarehouseTypes",
        methodProperties: {
          Language: language,
        },
      },
      setWarehouseTypesData,
      onError,
    )
      .then(setWarehouseTypesData)
      .catch(onError);
  }, []);

  var _useLoadScript = (0, _api.useLoadScript)({
      googleMapsApiKey: googleMapsApiKey,
      language: language,
    }),
    isLoaded = _useLoadScript.isLoaded,
    loadError = _useLoadScript.loadError;

  if (loadError) {
    onError(loadError);
  }

  if (!isLoaded || !warehouseData.length || !warehouseTypesData.length) {
    return _react.default.createElement(
      "div",
      {
        className: className,
      },
      children,
    );
  }

  return _react.default.createElement(_Map.default, {
    getCoordinates: getCoordinates,
    className: className,
    onError: onError,
    onSelect: onSelect,
    options: options,
    zoom: zoom,
    warehouseData: warehouseData,
    warehouseTypesData: warehouseTypesData,
  });
}
