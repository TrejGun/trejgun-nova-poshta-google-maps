"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = callAPI;

function callAPI(data) {
  return fetch("https://api.novaposhta.ua/v2.0/json/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(_ref) {
      var data = _ref.data;
      return data;
    });
}
