export interface ApiResponseBase {
  foo?: string;
}

export interface ApiGetUsersResponse extends ApiResponseBase {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface ApiGetUserResponse extends ApiResponseBase {
  data: User;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
