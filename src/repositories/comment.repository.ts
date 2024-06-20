import CommentModel from "../models/comment.model";
import { CommentData } from "../types";

class CommentRepository {
  async findWithLimit(limit: number) {
    return CommentModel.find({ deletedAt: null })
      .populate({
        path: "user",
        select: "_id avatarUrl username",
      })
      .limit(limit)
      .exec();
  }

  async create(commentData: CommentData) {
    const comment = new CommentModel(commentData);
    return comment.save();
  }

  async findByPost(postId: string) {
    return CommentModel.find({ post: postId }).populate({
      path: "user",
      select: "_id avatarUrl username",
    });
  }

  async deleteById(commentId: string) {
    return CommentModel.findByIdAndUpdate(commentId, { deletedAt: new Date() });
  }

  async update(commentId: string, commentData: CommentData) {
    return CommentModel.findByIdAndUpdate(commentId, commentData, {
      new: true,
    });
  }
}

export default new CommentRepository();
