import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import Router from "next/router";
import axios from "axios";
import { getAuthToken, setAuthToken, removeAuthToken } from "../util/auth";

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  UPDATE_NICKNAME_REQUEST,
  UPDATE_NICKNAME_SUCCESS,
  UPDATE_NICKNAME_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  LEAVE_USER_REQUEST,
  LEAVE_USER_SUCCESS,
  LEAVE_USER_FAILURE,
  FIND_PASSWORD_REQUEST,
  FIND_PASSWORD_SUCCESS,
  FIND_PASSWORD_FAILURE,
} from "../reducers/user";

function loginAPI(data) {
  return axios.post("/users/login", data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    setAuthToken(result.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data.code,
    });
    yield alert("로그인 정보가 일치하지 않습니다.");
  }
}

function logoutAPI() {
  return axios.post("/users/logout", "", {
    headers: { Authorization: getAuthToken()?.access_token },
  });
}

function* logout() {
  try {
    const result = yield call(logoutAPI);
    removeAuthToken();
    yield put({
      type: LOG_OUT_SUCCESS,
      data: result.data,
    });
    // 메인페이지로 이동(게시글 상세 페이지 제외)
    yield !Router.router?.route.includes("/view") && Router.push("/");
  } catch (error) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data.code,
    });
  }
}

function signUpAPI(data) {
  return axios.post("/users/join", data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data.code,
    });
  }
}

function leaveUserAPI() {
  return axios.delete("/users", {
    headers: { Authorization: getAuthToken()?.access_token },
  });
}

function* leaveUser() {
  try {
    yield call(leaveUserAPI);
    yield put({
      type: LEAVE_USER_SUCCESS,
    });
    // 메인페이지로 이동
    yield Router.push("/");
    // 세션스토리지 삭제
    yield removeAuthToken();
  } catch (error) {
    yield put({
      type: LEAVE_USER_FAILURE,
      error: error.response.data.code,
    });
  }
}

function updateNicknameAPI(data) {
  return axios.put("/users/nickname", data, {
    headers: { Authorization: getAuthToken()?.access_token },
  });
}

function* updateNickname(action) {
  try {
    const result = yield call(updateNicknameAPI, action.data);
    const updateAuth = getAuthToken();
    updateAuth.user.profile_nickname = action.data.profile_nickname;
    setAuthToken(updateAuth);
    yield put({
      type: UPDATE_NICKNAME_SUCCESS,
      // data: result.data.profile_nickname,
      data: action.data.profile_nickname,
    });
  } catch (error) {
    yield put({
      type: UPDATE_NICKNAME_FAILURE,
      error: error,
    });
  }
}

function updatePasswordAPI(data) {
  return axios.put("/users/password", data, {
    headers: { Authorization: getAuthToken()?.access_token },
  });
}

function* updatePassword(action) {
  try {
    yield call(updatePasswordAPI, action.data);
    yield put({
      type: UPDATE_PASSWORD_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: UPDATE_PASSWORD_FAILURE,
      error: error.response.data?.code,
    });
  }
}

function findPasswordAPI(data) {
  return axios.post("/users/password", data, {
    headers: { Authorization: getAuthToken()?.access_token },
  });
}

function* findPassword(action) {
  try {
    yield call(findPasswordAPI, action.data);
    yield put({
      type: FIND_PASSWORD_SUCCESS,
    });
    yield alert("해당 이메일로 임시 비밀번호가 전송되었습니다.");
  } catch (error) {
    yield put({
      type: FIND_PASSWORD_FAILURE,
      error: error.response.data?.code,
    });
    yield alert("가입 정보가 없습니다.");
  }
}

// 로그인 요청
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

// 로그아웃 요청
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

// 회원가입 요청
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

// 회원탈퇴
function* watchLeaveUser() {
  yield takeLatest(LEAVE_USER_REQUEST, leaveUser);
}

// 닉네임 변경
function* watchUpdateNickname() {
  yield takeLatest(UPDATE_NICKNAME_REQUEST, updateNickname);
}

// 비밀번호 변경
function* watchUpdatePassword() {
  yield takeLatest(UPDATE_PASSWORD_REQUEST, updatePassword);
}

// 비밀번호 찾기
function* watchFindPassword() {
  yield takeLatest(FIND_PASSWORD_REQUEST, findPassword);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchLeaveUser),
    fork(watchUpdateNickname),
    fork(watchUpdatePassword),
    fork(watchFindPassword),
  ]);
}
