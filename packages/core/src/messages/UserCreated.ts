import type { User } from '../domain/User';

export interface UserCreated {
  type: "user.created";
  payload: {
    user: User;
  };
}
