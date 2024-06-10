import PostModel from "../models/Post";

class PostRepository {
  async findWithLimit(limit: number) {
    return PostModel.find().limit(limit).exec();
  }

  async findAllPopulated() {
    return PostModel.find().populate("user").exec();
  }
  async findById(id: string) {
    return PostModel.findById(id).populate("user").exec();
  }

  async deleteById(id: string) {
    return PostModel.findByIdAndDelete(id);
  }

  async incrementViews(id: string) {
    return PostModel.findByIdAndUpdate(
      id,
      { $inc: { viewsCount: 1 } },
      { new: true }
    );
  }

  async create(postData: any) {
    const post = new PostModel(postData);
    return post.save();
  }

  async update(id: string, postData: any) {
    return PostModel.findByIdAndUpdate(id, postData, { new: true });
  }

  async addComment(postId: string, comment: any) {
    return PostModel.findByIdAndUpdate(
      postId,
      {
        $push: { comments: comment },
        $inc: { commentsCount: 1 },
      },
      { new: true }
    );
  }
}

export default new PostRepository();
