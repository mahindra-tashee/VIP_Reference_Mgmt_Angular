export interface Role {
    roleId: number;
    roleName: string;
  }
  
  export interface User {
    name:string;
    userId: number;
    userName: string;
    roles: Role[];
    createdAt: string;
  }