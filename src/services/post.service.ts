import postRepository from "../repositories/post.repository";
import { IPost, PaginationAndSort, PostData } from "../types";

class PostService {
  private async validatePostPermission(postId: string, userId: string) {
    const post = await postRepository.findById(postId);
    if (post?.deletedAt) {
      throw Error("The Post not found");
    }
    const postAuthorId = post?.user._id?.toString();
    if (postAuthorId !== userId) {
      throw Error("Forbidden: You do not have permission.");
    }

    return null;
  }

  private getSortOption(sortKey: string): Record<string, number> {
    switch (sortKey) {
      case "popular":
        return { viewsCount: -1 };
      case "new":
        return { createdAt: -1 };
      default:
        return { createdAt: -1 };
    }
  }

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

  async getAllPosts({ page, limit, sort }: PaginationAndSort) {
    const queryOptions = {
      page,
      limit,
      sort: this.getSortOption(sort),
    };
    return postRepository.findAllWithPagination(queryOptions);
  }

  async getPostById(id: string) {
    const post = await postRepository.findById(id);
    if (post?.deletedAt) {
      throw Error("The Post not found");
    }
    return post;
  }

  async deletePost(postId: string, userId: string) {
    await this.validatePostPermission(postId, userId);

    return await postRepository.deleteById(postId);
  }

  async createPost(postData: PostData) {
    return await postRepository.create(postData);
  }

  async updatePost(id: string, postData: PostData) {
    const { userId } = postData;
    await this.validatePostPermission(id, userId);

    return await postRepository.update(id, postData);
  }
}

export default new PostService();
