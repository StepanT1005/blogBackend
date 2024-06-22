import { Request, Response } from "express";
import postService from "../services/post.service";
import { PostData, QueryParams } from "../types";

class PostController {
  static async getLastTags(req: Request, res: Response) {
    try {
      const tags = await postService.getLastTags(5);
      res.json(tags);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve tags" });
    }
  }

  static async getAllPosts(
    req: Request<{}, {}, {}, QueryParams>,
    res: Response
  ) {
    try {
      const { page, limit, sort } = req.query;
      const paginationOptions = { page, limit, sort };
      const posts = await postService.getAllPosts(paginationOptions);

      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: "Failed to retrieve posts" });
    }
  }

  static async getPostById(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const post = await postService.getPostById(postId);
      if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve post" });
    }
  }

  static async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const { postId } = req.params;
      const result = await postService.deletePost(postId);
      if (!result) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      res.json({ success: true, message: "Post deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to delete post" });
    }
  }

  static async createPost(
    req: Request<{}, {}, PostData>,
    res: Response
  ): Promise<void> {
    try {
      const post = await postService.createPost(req.body);
      res.status(201).json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to create post" });
    }
  }

  static async updatePost(
    req: Request<{ postId: string }, {}, PostData>,
    res: Response
  ): Promise<void> {
    try {
      const { postId } = req.params;

      const updatedPost = await postService.updatePost(postId, req.body);
      if (!updatedPost) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      res.json(updatedPost);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to update post" });
    }
  }
}

export default PostController;
