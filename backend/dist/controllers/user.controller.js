"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const response_handler_1 = __importDefault(require("../handlers/response.handler"));
const prisma_1 = __importDefault(require("../prisma"));
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield prisma_1.default.user.findFirst({ where: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } });
        if (!user)
            return response_handler_1.default.notfound(res);
        response_handler_1.default.ok(res, {
            name: user.name,
            email: user.email,
            id: user.id,
        });
    }
    catch (error) {
        response_handler_1.default.error(res);
    }
});
exports.getUserInfo = getUserInfo;
//# sourceMappingURL=user.controller.js.map