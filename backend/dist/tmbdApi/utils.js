"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = void 0;
const baseUrl = process.env.TMBD_BASE_URL;
const getUrl = (url, params) => {
    const queryParams = new URLSearchParams(params);
    return `${baseUrl}${url}?&${queryParams}`;
};
exports.getUrl = getUrl;
//# sourceMappingURL=utils.js.map