import { createStore } from 'redux';
import { rootReducer } from '../reducers/rootReducer';

export const store = createStore(rootReducer);

store.subscribe(() => {
  console.log('subscribe', store.getState());
});

store.dispatch({
  type: 'AUTH_USER',
  payload: 'Token 94261c623a73d002beec78f0629dd6b18234fb1d',
});
