const initialState = {
  Token: 'Token undef',
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_USER':
      return { ...state, credentials: action.payload };
  }
  return state;
}
