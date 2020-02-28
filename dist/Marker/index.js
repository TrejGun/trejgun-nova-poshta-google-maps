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
exports.MemoMarker = react_1.memo(props => {
  return react_1.default.createElement(api_1.Marker, Object.assign({}, props));
});
//# sourceMappingURL=index.js.map
