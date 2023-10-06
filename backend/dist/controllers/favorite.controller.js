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
exports.getAllFavorites = exports.removeFavorite = exports.addToFavorite = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const response_handler_1 = __importDefault(require("../handlers/response.handler"));
const addToFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { movieId } = req.body;
        const isFavorite = yield prisma_1.default.favorite.findFirst({
            where: {
                userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                movieId,
            },
        });
        if (isFavorite)
            return response_handler_1.default.ok(res, isFavorite);
        const favorite = yield prisma_1.default.favorite.create({
            data: Object.assign(Object.assign({}, req.body), { user: {
                    connect: {
                        id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
                    },
                } }),
        });
        response_handler_1.default.created(res, favorite);
    }
    catch (error) {
        response_handler_1.default.error(res);
    }
});
exports.addToFavorite = addToFavorite;
const removeFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const { movieId } = req.body;
        const favorite = yield prisma_1.default.favorite.findFirst({
            where: { movieId, userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id },
        });
        if (!favorite)
            return response_handler_1.default.notfound(res);
        yield prisma_1.default.favorite.delete({
            where: { movieId, userId: (_d = req.user) === null || _d === void 0 ? void 0 : _d.id },
        });
        response_handler_1.default.ok(res, {});
    }
    catch (error) {
        console.log(error);
        response_handler_1.default.error(res);
    }
});
exports.removeFavorite = removeFavorite;
const getAllFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const userFavorites = yield prisma_1.default.favorite.findMany({
            where: { userId: (_e = req.user) === null || _e === void 0 ? void 0 : _e.id },
            orderBy: { createdAt: "asc" },
        });
        response_handler_1.default.ok(res, userFavorites);
    }
    catch (error) {
        response_handler_1.default.error(res);
    }
});
exports.getAllFavorites = getAllFavorites;
//# sourceMappingURL=favorite.controller.js.map