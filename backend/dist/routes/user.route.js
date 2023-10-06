"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favorite_controller_1 = require("../controllers/favorite.controller");
const token_middleware_1 = __importDefault(require("../middleware/token.middleware"));
const user_controller_1 = require("../controllers/user.controller");
const request_handler_1 = __importDefault(require("../handlers/request.handler"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post("/addFavorite", token_middleware_1.default.checkAuth, (0, express_validator_1.body)("movieId")
    .exists()
    .withMessage("movieId is required")
    .isLength({ min: 1 })
    .withMessage("movieId can not be empty"), (0, express_validator_1.body)("movieTitle").exists().isString().withMessage("movieTitle is required"), (0, express_validator_1.body)("moviePosterURL")
    .exists()
    .isString()
    .withMessage("moviePosterURL is required"), (0, express_validator_1.body)("movieReleaseData")
    .exists()
    .isString()
    .withMessage("movieReleaseData is required"), (0, express_validator_1.body)("movieGenre").exists().withMessage("movieGenre is required"), (0, express_validator_1.body)("movieRating")
    .exists()
    .isFloat()
    .withMessage("movieRating should be int"), request_handler_1.default.validate, favorite_controller_1.addToFavorite);
router.delete("/removeFavorite", token_middleware_1.default.checkAuth, (0, express_validator_1.body)("movieId").exists().withMessage("favoriteId is required"), request_handler_1.default.validate, favorite_controller_1.removeFavorite);
router.get("/getAllFavorites", token_middleware_1.default.checkAuth, favorite_controller_1.getAllFavorites);
router.get("/getUserInfo", token_middleware_1.default.checkAuth, user_controller_1.getUserInfo);
exports.default = router;
//# sourceMappingURL=user.route.js.map