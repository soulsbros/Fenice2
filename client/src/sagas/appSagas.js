import { fork, takeLatest } from 'redux-saga/effects';
import { addCharactersAction, getCharacters, getCharsByCampaign } from './characters';

function* watcher() {
  yield takeLatest('GET_ALL_CHARACTERS', getCharacters);
  yield takeLatest('ADD_ACTION', addCharactersAction);
  yield takeLatest('GET_CHARACTERS_BY_CAMPAIGN', getCharsByCampaign);
}

export default function* root() {
  yield fork(watcher);
}
