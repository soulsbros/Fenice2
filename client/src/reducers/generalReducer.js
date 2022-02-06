const initialState = {
  page: 'home',
};

const generalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_PAGE':
      return {
        ...state,
        page: payload,
      };
    default:
      return state;
  }
};

export default generalReducer;
