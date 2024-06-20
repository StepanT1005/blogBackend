import { IPost } from "./post.types";
import { IUser } from "./user.types";

export interface IComment {
  _id: string;
  post: IPost;
  user: IUser;
  likes: IUser[];
  content: string;
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
}

export interface CommentReqData {
  content: string;
  userId: string;
  postId: string;
}

export interface CommentData {
  content: string;
  user: string;
  post: string;
}
