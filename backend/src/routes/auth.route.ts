import express from "express";
import { signIn, signUp } from "../controllers/auth.controller";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler";

const router = express.Router();

router.post(
  "/signup",
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),
  body("name")
    .exists()
    .withMessage("Name is required")
    .isLength({ min: 6 })
    .withMessage("Name should be minimum 6 characters"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be minimum 6 characters"),
  body("name").exists().withMessage("Name is required"),
  requestHandler.validate,
  signUp
);

router.post(
  "/signin",
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be minimum 6 characters"),
  requestHandler.validate,
  signIn
);

export default router;
