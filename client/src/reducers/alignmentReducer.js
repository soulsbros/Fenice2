const initialState = {
  characters: [],
  actionWeight: 1,
  campaign: null,
  reasonInput: '',
};

const alignmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_CHARACTERS':
      return {
        ...state,
        characters: payload,
      };
    case 'SET_ACTION_WEIGHT':
      return {
        ...state,
        actionWeight: payload,
      };
    case 'SET_CAMPAIGN':
      return {
        ...state,
        campaign: payload,
      };
    case 'SET_REASON_INPUT':
      return {
        ...state,
        reasonInput: payload,
      };
    default:
      return state;
  }
};

export default alignmentReducer;
