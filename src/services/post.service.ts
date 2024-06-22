import postRepository from "../repositories/post.repository";
import { IPost, PaginationAndSort, PostData } from "../types";

class PostService {
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
      return { message: "The Post has been deleted " };
    }
    return post;
  }

  async deletePost(id: string) {
    return await postRepository.deleteById(id);
  }

  async createPost(postData: PostData) {
    return await postRepository.create(postData);
  }

  async updatePost(id: string, postData: PostData) {
    return await postRepository.update(id, postData);
  }
}

export default new PostService();
