import { createStore } from 'redux';
import { rootReducer } from '../reducers/rootReducer';

export const store = createStore(rootReducer);

store.subscribe(() => {
  console.log('subscribe', store.getState());
});
