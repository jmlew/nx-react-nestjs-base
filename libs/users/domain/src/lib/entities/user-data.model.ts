interface UserDbItem {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserDetails {
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface User extends UserDetails, UserDbItem {}

export interface GetUsersResponse {
  page?: number;
  perPage?: number;
  total?: number;
  totalPages?: number;
  data: User[];
}

export interface GetUserResponse {
  data: User;
}

export interface CreateUserResponse extends User, UserDbItem {
  createdAt: string;
}

export interface UpdateUserResponse extends User, UserDbItem {
  updatedAt: string;
}

export interface DeleteUserResponse {
  id: number;
  status: string;
}
