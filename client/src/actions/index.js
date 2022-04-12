export const setActionWeight = (payload) => ({
  type: 'SET_ACTION_WEIGHT',
  payload,
});

export const setCampaign = (payload) => ({
  type: 'SET_CAMPAIGN',
  payload,
});

export const setAllCharacters = (payload) => ({
  type: 'SET_CHARACTERS',
  payload,
});

export const getCharacters = () => ({
  type: 'GET_ALL_CHARACTERS',
});

export const getCharactersByCampaign = (payload) => ({
  type: 'GET_CHARACTERS_BY_CAMPAIGN',
  payload,
});

export const addAction = (payload) => ({
  type: 'ADD_ACTION',
  payload,
});

export const setReasonInput = (payload) => ({
  type: 'SET_REASON_INPUT',
  payload,
});
