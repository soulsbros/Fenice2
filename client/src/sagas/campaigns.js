import { call, put } from 'redux-saga/effects';
import { setAllCharacters } from '../actions';
import { addAction, getAllCharacters } from '../api/alignment';

export function* addCharacterAction({ payload }) {
  try {
    const res = yield call(addAction, payload);

    if (res) {
      const { data } = yield call(getAllCharacters);

      yield put(setAllCharacters(data));
    }
  } catch (e) {
    console.error(e);
  }
}
