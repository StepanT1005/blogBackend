export interface IUser {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  passwordHash: string;
  avatarUrl: String;
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
  posts: string[]; // Array of post IDs
}

export interface UserData {
  email: string;
  password: string;
  username: string;
  avatarUrl?: string;
}
