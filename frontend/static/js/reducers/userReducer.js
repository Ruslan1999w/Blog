const initialState = {
  token: 'Token 9a4378dd6e025967e0c606b3bcbe4780070637f1', //во время прокашн токен должен быть удален
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_USER':
      return { ...state, token: action.payload };
  }
  return state;
}
