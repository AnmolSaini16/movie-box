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
exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_handler_1 = __importDefault(require("../handlers/response.handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../prisma"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const checkEmail = yield prisma_1.default.user.findUnique({
            where: { email },
        });
        if (checkEmail) {
            return response_handler_1.default.badrequest(res, "Email already in use");
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hash = bcrypt_1.default.hashSync(password, salt);
        const user = yield prisma_1.default.user.create({
            data: {
                name,
                email,
                password: hash,
            },
        });
        const token = jsonwebtoken_1.default.sign({ data: user.id }, process.env.TOKEN_SECRET, { expiresIn: "24h" });
        return response_handler_1.default.created(res, {
            token,
            name: user.name,
            email: user.email,
            id: user.id,
        });
    }
    catch (_a) {
        response_handler_1.default.error(res);
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma_1.default.user.findFirst({ where: { email } });
        if (!user)
            return response_handler_1.default.badrequest(res, "User not found");
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect)
            return response_handler_1.default.badrequest(res, "Incorrect password");
        // Valid User
        const token = jsonwebtoken_1.default.sign({ data: user.id }, process.env.TOKEN_SECRET, { expiresIn: "24h" });
        return response_handler_1.default.created(res, {
            token,
            name: user.name,
            email: user.email,
            id: user.id,
        });
    }
    catch (_b) {
        response_handler_1.default.error(res);
    }
});
exports.signIn = signIn;
//# sourceMappingURL=auth.controller.js.map