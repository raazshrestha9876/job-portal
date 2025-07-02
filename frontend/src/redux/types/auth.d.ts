export interface IUser {
  fullname: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface IUserState {
  user: IUser | null;
  isAuthenticated: boolean;
}
