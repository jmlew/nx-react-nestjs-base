interface UserDbItem {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserDetails {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

export interface User extends UserDetails, UserDbItem {}

export interface GetUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
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
