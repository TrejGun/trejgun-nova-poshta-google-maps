"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callAPI = void 0;
function callAPI(data) {
    return fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .then(({ data }) => data);
}
exports.callAPI = callAPI;
//# sourceMappingURL=utils.js.map