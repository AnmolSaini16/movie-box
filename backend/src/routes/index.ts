import express from "express";
import movieRoutes from "./movie.route";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";

const router = express.Router();

router.use("/movie", movieRoutes);

router.use("/auth", authRoutes);

router.use("/user", userRoutes);

export default router;
