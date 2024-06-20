import express from "express";
import PostController from "../controllers/post.controller";
import { postCreateValidation } from "../validation";
import handleValidationErrors from "../middleware/handleValidationErrors";
import checkAuth from "../middleware/checkAuth";

const router = express.Router();

router.get("/", PostController.getAllPosts);
router.get("/getLastTags", PostController.getLastTags);
router.get("/:postId", PostController.getPostById);

router.post(
  "/",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.createPost
);
router.delete("/:postId", checkAuth, PostController.deletePost);
router.patch(
  "/:postId",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.updatePost
);

export default router;
