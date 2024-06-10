import postRepository from "../repositories/post.repository";

class PostService {
  async getLastTags(limit: number) {
    const posts = await postRepository.findWithLimit(limit);
    const tags = posts
      .map((p) => p.tags)
      .flat()
      .slice(0, limit)
      .join(" ")
      .split(" ")
      .slice(0, limit);
    return tags;
  }

  async getAllPosts() {
    return await postRepository.findAllPopulated();
  }

  async getPostById(id: string) {
    return await postRepository.findById(id);
  }

  async deletePost(id: string) {
    return await postRepository.deleteById(id);
  }

  async incrementPostViews(postId: string): Promise<void> {
    await postRepository.incrementViews(postId);
  }

  async createPost(postData: any) {
    return await postRepository.create(postData);
  }

  async updatePost(id: string, postData: any) {
    return await postRepository.update(id, postData);
  }

  async addCommentToPost(postId: string, comment: any) {
    return await postRepository.addComment(postId, comment);
  }

  async getRecentComments(limit: number) {
    const posts = await postRepository.findWithLimit(limit);
    return posts
      .map((post) => post.comments)
      .flat()
      .slice(0, limit);
  }
}

export default new PostService();
