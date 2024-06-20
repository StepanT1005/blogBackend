import postRoutes from "./posts.router";
import userRoutes from "./user.router";
import commentariesRoutes from "./comments.router";

import express from "express";

const router = express.Router();

router.use("/posts", postRoutes);
router.use("/auth", userRoutes);
router.use("/comments", commentariesRoutes);

export default router;
