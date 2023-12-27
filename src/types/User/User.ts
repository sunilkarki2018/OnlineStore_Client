export type Role = "admin" | "customer";

export interface User {
  id: string;  
  firstName: string;
  lastName: string;
  email: string;
  password:string
  avatar: string;
  role: Role;
  houseNumber: string;
  street: string;
  postCode: string;
  city: string;
  country: string;
}
