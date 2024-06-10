import postRoutes from "./posts.router";
import userRoutes from "./user.router";

import express from "express";

const router = express.Router();

router.use("/posts", postRoutes);
router.use("/auth", userRoutes);

export default router;
