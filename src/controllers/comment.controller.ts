import { Request, Response } from "express";
import commentService from "../services/comment.service";
import { CommentData, CommentReqData } from "../types";
import postRepository from "../repositories/post.repository";

export class CommentController {
  static async createComment(
    req: Request<{}, {}, CommentReqData>,
    res: Response
  ) {
    try {
      const { content, userId, postId } = req.body;
      const comment = await commentService.addComment({
        content,
        user: userId,
        post: postId,
      });

      await postRepository.addCommentToPost(postId, comment._id);

      res.status(201).json(comment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to create comment" });
    }
  }

  static async getCommentsByPost(
    req: Request<{ postId: string }>,
    res: Response
  ) {
    try {
      const { postId } = req.params;
      const comments = await commentService.getCommentsByPost(postId);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to get comments" });
    }
  }

  static async getLastComments(req: Request, res: Response): Promise<void> {
    try {
      const comments = await commentService.getRecentComments(5);
      res.json(comments);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get comments" });
    }
  }

  static async updateComment(
    req: Request<{ commentId: string }, {}, CommentData>,
    res: Response
  ) {
    try {
      const { commentId } = req.params;
      const comments = await commentService.updateComment(commentId, req.body);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete comment" });
    }
  }

  static async deleteComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const comments = await commentService.deleteComment(commentId);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete comment" });
    }
  }
}

export default CommentController;
