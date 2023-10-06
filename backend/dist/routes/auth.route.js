"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const express_validator_1 = require("express-validator");
const request_handler_1 = __importDefault(require("../handlers/request.handler"));
const router = express_1.default.Router();
router.post("/signup", (0, express_validator_1.body)("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"), (0, express_validator_1.body)("name")
    .exists()
    .withMessage("Name is required")
    .isLength({ min: 6 })
    .withMessage("Name should be minimum 6 characters"), (0, express_validator_1.body)("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be minimum 6 characters"), (0, express_validator_1.body)("name").exists().withMessage("Name is required"), request_handler_1.default.validate, auth_controller_1.signUp);
router.post("/signin", (0, express_validator_1.body)("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"), (0, express_validator_1.body)("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be minimum 6 characters"), request_handler_1.default.validate, auth_controller_1.signIn);
exports.default = router;
//# sourceMappingURL=auth.route.js.map