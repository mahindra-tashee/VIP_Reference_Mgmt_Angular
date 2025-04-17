export interface Role {
    roleId: number;
    roleName: string;
  }
  
  export interface User {
    userId: number;
    userName: string;
    roles: Role[];
    createdAt: string;
  }