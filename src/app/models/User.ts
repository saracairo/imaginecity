export interface User {
  id?: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface CurrentUser {
  id?: number;
  name: string;
  email: string;
  gender: string;
  status: string;
  token: string;
}

export interface UserBody {
  name: string;
  email: string;
  gender: string;
  status: string;
}
