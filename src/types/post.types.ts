import { IComment } from "./comment.types";
import { IUser } from "./user.types";

export interface IPost {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  user: IUser;
  viewsCount: number;
  likes: IUser[];
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  comments: IComment[];
}

export interface PostData {
  title: string;
  text: string;
  tags?: string[];
  imageUrl?: string;
  userId: string;
}
