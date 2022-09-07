const initialState = {
  detailsDialogOpen: false,
  selectedCharacter: null,
};

const charactersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_DETAILS_DIALOG_OPEN':
      return {
        ...state,
        detailsDialogOpen: payload,
      };
    case 'SET_SELECTED_CHARACTER':
      return {
        ...state,
        selectedCharacter: payload,
      };
    default:
      return state;
  }
};

export default charactersReducer;
