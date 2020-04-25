import { combineReducers } from "redux";
import UserReducers from "./user_store";
//если у нас когда-нибудь будет больше одного хранилища, то чтобы все они были доступны
//их надо будет добавить в allReducers
const allReducers = combineReducers({
  user: UserReducers,
});
export default allReducers;
