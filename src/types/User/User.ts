export type Role = "admin" | "customer";

export interface User {
  id: string;  
  firstName: string;
  lastName: string;
  email: string;
  avatar: Avatar;
  role: Role;
  address: Address;
}
