// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ResponseBase {}

export interface GetUsersResponse extends ResponseBase {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface GetUserResponse extends ResponseBase {
  data: User;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
