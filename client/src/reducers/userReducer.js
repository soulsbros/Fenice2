const initialState = {
  username: null,
  dm: false,
  admin: false,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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

export default userReducer;
