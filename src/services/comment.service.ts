import commentRepository from "../repositories/comment.repository";
import { CommentData } from "../types";

class CommentService {
  async addComment(commentData: CommentData) {
    return commentRepository.create(commentData);
  }

  async getCommentsByPost(postId: string) {
    return commentRepository.findByPost(postId);
  }

  async deleteComment(commentId: string) {
    return commentRepository.deleteById(commentId);
  }

  async updateComment(commentId: string, commentData: CommentData) {
    return commentRepository.update(commentId, commentData);
  }

  async getRecentComments(limit: number) {
    return await commentRepository.findWithLimit(limit);
  }
}

export default new CommentService();
