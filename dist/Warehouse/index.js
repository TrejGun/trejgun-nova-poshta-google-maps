"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = Warehouse;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _api = require("@react-google-maps/api");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function Warehouse(_ref) {
  var warehouse = _ref.warehouse,
    warehouseTypesData = _ref.warehouseTypesData,
    onClose = _ref.onClose;

  if (!warehouse) {
    return null;
  }

  return _react.default.createElement(
    _api.InfoWindow,
    {
      onCloseClick: onClose,
      position: {
        lat: Number(warehouse.Latitude),
        lng: Number(warehouse.Longitude),
      },
    },
    _react.default.createElement(
      "div",
      null,
      _react.default.createElement(
        "strong",
        null,
        warehouseTypesData.find(function(type) {
          return type.Ref === warehouse.TypeOfWarehouse;
        }).Description,
        " \u2116",
        warehouse.Number,
      ),
      _react.default.createElement("div", null, warehouse.ShortAddress),
    ),
  );
}
