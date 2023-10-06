"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data);
const error = (res) => responseWithData(res, 500, {
    status: 500,
    message: "Oops! Something worng!",
});
const ok = (res, data) => responseWithData(res, 200, data);
const created = (res, data) => responseWithData(res, 201, data);
const unauthorize = (res) => responseWithData(res, 401, {
    status: 401,
    message: "Unathorized",
});
const notfound = (res) => responseWithData(res, 404, {
    status: 404,
    message: "Resource not found",
});
const badrequest = (res, message) => responseWithData(res, 400, {
    status: 400,
    message,
});
exports.default = {
    error,
    ok,
    badrequest,
    created,
    unauthorize,
    notfound,
};
//# sourceMappingURL=response.handler.js.map