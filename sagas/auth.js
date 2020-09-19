import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

import { LOAD_TERMS_REQUEST, LOAD_TERMS_SUCCESS, LOAD_TERMS_FAILURE } from "../reducers/auth";

function loadTermsAPI() {
  return axios.get("/users/terms");
}

function* loadTerms() {
  try {
    const result = yield call(loadTermsAPI);
    yield put({
      type: LOAD_TERMS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_TERMS_FAILURE,
      error: error.response.data,
    });
  }
}

// 회원가입 약관 요청
function* watchLoadTerms() {
  yield takeLatest(LOAD_TERMS_REQUEST, loadTerms);
}

export default function* authSaga() {
  yield all([fork(watchLoadTerms)]);
}
