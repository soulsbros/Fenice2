const initialState = {
  page: 'home',
  selectedCampaign: { label: null },
};

const generalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_PAGE':
      return {
        ...state,
        page: payload,
      };
    case 'SET_CAMPAIGN':
      return {
        ...state,
        selectedCampaign: payload,
      };
    default:
      return state;
  }
};

export default generalReducer;
