const initialState = {
  characters: [],
  actionWeight: 1,
  reasonInput: '',
  selectedChars: [],
  showActionHistory: false,
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
    case 'SET_REASON_INPUT':
      return {
        ...state,
        reasonInput: payload,
      };
    case 'ADD_SELECTED_CHAR':
      return {
        ...state,
        selectedChars: [...state.selectedChars, payload],
      };
    case 'SET_SHOW_ACTION_HISTORY':
      return {
        ...state,
        showActionHistory: payload,
      };
    default:
      return state;
  }
};

export default alignmentReducer;
