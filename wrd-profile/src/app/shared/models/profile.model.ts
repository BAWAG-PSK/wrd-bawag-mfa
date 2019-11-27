export interface User {
  firstName: string;
  lastName: string;
  nickName: string;
  avatar: string;
}

export interface Profile {
  user: User;
}
