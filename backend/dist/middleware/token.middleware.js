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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_handler_1 = __importDefault(require("../handlers/response.handler"));
const prisma_1 = __importDefault(require("../prisma"));
const tokenDecode = (req) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1];
            return jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        }
        return false;
    }
    catch (_a) {
        return false;
    }
};
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = tokenDecode(req);
    if (!data)
        return response_handler_1.default.unauthorize(res);
    const user = yield prisma_1.default.user.findFirst({
        where: { id: data },
    });
    if (!user)
        return response_handler_1.default.unauthorize(res);
    req.user = user;
    next();
});
exports.default = { checkAuth, tokenDecode };
//# sourceMappingURL=token.middleware.js.map