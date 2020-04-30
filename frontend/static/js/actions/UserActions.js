import { store } from '../store/store';
export const AUTH_USER = 'AUTH_USER';

export function setUser(user) {
  const action = {
    type: 'AUTH_USER',
    payload: user,
  };
  store.dispatch(action);
}
