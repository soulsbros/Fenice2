const initialState = {
  page: 'home',
  username: null,
};

const generalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_PAGE':
      return {
        ...state,
        page: payload,
      };
    case 'SET_USERNAME':
      return {
        ...state,
        username: payload,
      };
    default:
      return state;
  }
};

export default generalReducer;
