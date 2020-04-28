const initialState = {
  name: 'TEST',
};
export default function test_reducer(state = initialState, action) {
  switch (action.type) {
    case 'TEST':
      console.log('test_reducer ' + state);
      return { ...state, test: action.payload };
  }

  return state;
}
