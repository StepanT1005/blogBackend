import { Request, Response } from "express";
import postService from "../services/post.service";

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

  static async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await postService.getAllPosts();
      res.json(posts);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve posts" });
    }
  }

  static async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;
      await postService.incrementPostViews(postId);
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
      const result = await postService.deletePost(req.params.id);
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

  static async createPost(req: Request, res: Response): Promise<void> {
    try {
      const post = await postService.createPost(req.body);
      res.status(201).json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to create post" });
    }
  }

  static async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const updatedPost = await postService.updatePost(req.params.id, req.body);
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

  static async addComment(req: Request, res: Response): Promise<void> {
    try {
      const updatedPost = await postService.addCommentToPost(
        req.params.id,
        req.body
      );
      if (!updatedPost) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      res.json({ success: true, message: "Comment added successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to add comment" });
    }
  }

  static async getLastComments(req: Request, res: Response): Promise<void> {
    try {
      const comments = await postService.getRecentComments(5);
      res.json(comments);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve comments" });
    }
  }
}

export default PostController;
