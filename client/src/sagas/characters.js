import { call, put } from 'redux-saga/effects';
import { setAllCharacters } from '../actions';
import { addAction, getAllCharacters, getCharactersByCampaign } from '../api/alignment';

export function* getCharacters() {
  try {
    const { data } = yield call(getAllCharacters);

    yield put(setAllCharacters(data));
  } catch (e) {
    console.error(e);
  }
}

export function* getCharsByCampaign({ payload }) {
  try {
    const { data } = yield call(getCharactersByCampaign, payload);

    yield put(setAllCharacters(data));
  } catch (e) {
    console.error(e);
  }
}

export function* addCharacterAction({ payload }) {
  try {
    const res = yield call(addAction, payload);

    if (res) {
      const { data } = yield call(getCharactersByCampaign, payload.campaign);

      yield put(setAllCharacters(data));
    }
  } catch (e) {
    console.error(e);
  }
}
