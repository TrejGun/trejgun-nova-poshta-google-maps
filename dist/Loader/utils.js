"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
function callAPI(data) {
  return fetch("https://api.novaposhta.ua/v2.0/json/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(({data}) => data);
}
exports.callAPI = callAPI;
//# sourceMappingURL=utils.js.map
