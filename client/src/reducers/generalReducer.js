const initialState = {
  page: 'home',
  username: null,
  dm: false,
  admin: false,
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
    case 'SET_LOGIN_DATA':
      return {
        ...state,
        username: payload.username,
        dm: payload.dm,
        admin: payload.admin,
      };
    default:
      return state;
  }
};

export default generalReducer;
