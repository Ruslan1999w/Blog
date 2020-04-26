import { createStore } from "redux";
import allReducers from "../reducers/main_reducer";

function auth_user(state = [], action) {
  switch (action.type) {
    case "AUTH_USER":
      return [
        ...state,
        action.payload
      ];
  }
  return state;
}

export const store = createStore(auth_user);

store.subscribe(() => {
  console.log("subscribe", store.getState());
});

store.dispatch({ type: "AUTH_USER", payload: "Token 94261c623a73d002beec78f0629dd6b18234fb1d" });
