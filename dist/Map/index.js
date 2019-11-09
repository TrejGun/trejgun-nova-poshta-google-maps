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
exports.default = Map;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _api = require("@react-google-maps/api");

var _Warehouse = _interopRequireDefault(require("../Warehouse"));

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

function Map(props) {
  var className = props.className,
    onError = props.onError,
    onSelect = props.onSelect,
    warehouseData = props.warehouseData,
    warehouseTypesData = props.warehouseTypesData,
    getCoordinates = props.getCoordinates,
    options = props.options,
    zoom = props.zoom;

  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    warehouse = _useState2[0],
    setWarehouse = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    coordinates = _useState4[0],
    setCoordinates = _useState4[1];

  (0, _react.useEffect)(
    function() {
      getCoordinates(setCoordinates, onError);
    },
    [getCoordinates],
  );

  var onClose = function onClose() {
    return setWarehouse(null);
  };

  if (!coordinates) {
    return null;
  }

  return _react.default.createElement(
    _api.GoogleMap,
    {
      mapContainerClassName: className,
      center: coordinates,
      zoom: zoom,
      options: options,
    },
    _react.default.createElement(_Warehouse.default, {
      warehouseTypesData: warehouseTypesData,
      warehouse: warehouse,
      onClose: onClose,
    }),
    _react.default.createElement(
      _api.MarkerClusterer,
      {
        options: {
          imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        },
      },
      function(clusterer) {
        return warehouseData.map(function(warehouse) {
          return _react.default.createElement(_api.Marker, {
            key: warehouse.Ref,
            position: {
              lat: Number(warehouse.Latitude),
              lng: Number(warehouse.Longitude),
            },
            clusterer: clusterer,
            onClick: function onClick() {
              onSelect(warehouse);
              setWarehouse(warehouse);
            },
          });
        });
      },
    ),
  );
}
