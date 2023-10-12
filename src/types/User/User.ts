export type Role = "admin" | "customer";

export interface User {
  id: number;  
  name: string;
  email: string;
  role: Role;
  password: string;
  avatar: string;
}
