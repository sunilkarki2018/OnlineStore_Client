import { User } from "./User";

export interface UserReducerState {
    users: User[];
    currentUser?:User;
    error?: string;
    loading:boolean;
  }