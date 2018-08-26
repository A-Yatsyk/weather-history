import { put, call, takeLatest } from 'redux-saga/effects';
import {
  GET_HISTORY_WEATHER, getHistoryWeatherSuccess, getHistoryWeatherFailure,
} from '../actions/weather';
import { getWeather as getWeatherAPI } from '../APIs/weather';
import Parse from '../helpers/parser';

function* getWeather({ city }) {
  try {
    let response = yield call(getWeatherAPI, city);
    if (response && response !== 'File not found."') {
      response = yield call(Parse, response);
      yield put(getHistoryWeatherSuccess(response, city));
    } else yield put(getHistoryWeatherFailure(response));
  } catch (error) {
    yield put(getHistoryWeatherFailure(error));
    // need to add an error event handler
  }
}

export default function* getWeatherSaga() {
  yield takeLatest(GET_HISTORY_WEATHER, getWeather);
}
