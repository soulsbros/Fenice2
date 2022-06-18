const initialState = {
  playerData: {},
  clientId: null,
  currPlayer: null,
};

const trackerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_PLAYER_DATA':
      return {
        ...state,
        playerData: payload,
      };
    case 'SET_CURRENT_PLAYER':
      return {
        ...state,
        currPlayer: payload,
      };
    case 'SET_CLIENT_ID':
      return {
        ...state,
        clientId: payload,
      };
    case 'RESET_IDS':
      return initialState;
    default:
      return state;
  }
};

export default trackerReducer;
