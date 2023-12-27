import { CreateUserInput } from "./CreateUserInput";
import { Role } from "./User";

export interface UpdateUserInput {
  update: Partial<CreateUserInput>;
  role: Role;
  id: string;
}
