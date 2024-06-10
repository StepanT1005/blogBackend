import express from "express";
import PostController from "../controllers/post.controller";
import { postCreateValidation } from "../validation";
import handleValidationErrors from "../middleware/handleValidationErrors";
import checkAuth from "../middleware/checkAuth";

const router = express.Router();

router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);
router.get("/tags", PostController.getLastTags);
router.get("/commentaries", PostController.getLastComments);

router.post(
  "/",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.createPost
);
router.delete("/:id", checkAuth, PostController.deletePost);
router.patch(
  "/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.updatePost
);
router.patch("/:id/comments", PostController.addComment);

export default router;
