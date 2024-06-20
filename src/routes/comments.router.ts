import express from "express";
import checkAuth from "../middleware/checkAuth";
import CommentController from "../controllers/comment.controller";

const router = express.Router();

router.post("/", checkAuth, CommentController.createComment);
router.get("/getLastComments", CommentController.getLastComments);
router.get("/:postId", CommentController.getCommentsByPost);
router.delete("/:commentId", checkAuth, CommentController.deleteComment);
router.patch("/:commentId", checkAuth, CommentController.updateComment);

export default router;
