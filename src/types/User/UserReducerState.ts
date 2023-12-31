import { User } from "./User";

export interface UserReducerState {
  users: User[];
  user?: User|undefined;
  currentUser?: User;
  error?: string;
  loading: boolean;
}
