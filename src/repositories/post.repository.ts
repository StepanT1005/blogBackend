import mongoose from "mongoose";
import PostModel from "../models/post.model";
import { PostData } from "../types";

class PostRepository {
  async findWithLimit(limit: number) {
    return PostModel.find({ deletedAt: null }).limit(limit).exec();
  }

  async findAllWithPagination({
    page,
    limit,
    sort,
  }: {
    page: number;
    limit: number;
    sort: any;
  }) {
    const skip = (page - 1) * limit;
    return PostModel.find({ deletedAt: null })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "user",
        select: "_id avatarUrl username",
      })
      .exec();
  }

  async findById(id: string) {
    return PostModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    )
      .populate({
        path: "user",
        select: "_id avatarUrl username",
      })
      .exec();
  }

  async deleteById(id: string) {
    return PostModel.findByIdAndUpdate(id, { deletedAt: new Date() });
  }

  async create(postData: PostData) {
    const { title, text, imageUrl, tags, userId: user } = postData;
    const post = new PostModel({
      title,
      text,
      imageUrl,
      tags,
      user,
    });
    return post.save();
  }

  async update(id: string, postData: PostData) {
    return PostModel.findByIdAndUpdate(id, postData, { new: true });
  }

  async addCommentToPost(postId: string, commentId: mongoose.Types.ObjectId) {
    await PostModel.findByIdAndUpdate(postId, {
      $push: { comments: commentId },
    });
  }
}

export default new PostRepository();
