import { CreateUserInput } from "./CreateUserInput";
import { Role } from "./User";

export interface UpdateUserInput {
  update: Partial<CreateUserInput>;
  id: string;
}
