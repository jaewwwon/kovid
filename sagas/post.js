import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import Router from "next/router";
import axios from "axios";
import { getAuthToken } from "../util/auth";

import {
  LOAD_CATEGORY_REQUEST,
  LOAD_CATEGORY_SUCCESS,
  LOAD_CATEGORY_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_DETAIL_REQUEST,
  LOAD_POST_DETAIL_SUCCESS,
  LOAD_POST_DETAIL_FAILURE,
  WRITE_POST_REQUEST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  LOAD_RATING_REQUEST,
  LOAD_RATING_SUCCESS,
  LOAD_RATING_FAILURE,
  DELETE_RATING_REQUEST,
  DELETE_RATING_SUCCESS,
  DELETE_RATING_FAILURE,
  POST_RATING_REQUEST,
  POST_RATING_SUCCESS,
  POST_RATING_FAILURE,
  LOAD_COMMENT_REQUEST,
  LOAD_COMMENT_SUCCESS,
  LOAD_COMMENT_FAILURE,
  WRITE_COMMENT_REQUEST,
  WRITE_COMMENT_SUCCESS,
  WRITE_COMMENT_FAILURE,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from "../reducers/post";

function loadCategoryAPI() {
  return axios.get("/categories");
}

function* loadCategory(action) {
  try {
    const result = yield call(loadCategoryAPI);
    yield put({
      type: LOAD_CATEGORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_CATEGORY_FAILURE,
      error: error.response.data,
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post("/posts/images", data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: error.response.data,
    });
  }
}

function loadPostsAPI(data) {
  return data?.search_word
    ? axios.get(
        `/posts?page=${data.page}&limit=10&category_id=${data.category_id}&search_type=${data.search_type}&search_word=${data.search_word}`,
      )
    : axios.get(`/posts?page=${data.page}&limit=10&category_id=${data.category_id}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostDetailAPI(data) {
  return axios.get(`/posts/${data.id}`);
}

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.data);
    yield put({
      type: LOAD_POST_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_DETAIL_FAILURE,
      error: err.response.data.code,
    });
  }
}

function writePostAPI(data) {
  return axios.post(
    "/posts",
    {
      category_id: data.category_id,
      title: data.title,
      content: data.content,
      attach_ids: data.attach_ids,
    },
    {
      headers: { Authorization: getAuthToken()?.access_token },
    },
  );
}

function* writePost(action) {
  try {
    const result = yield call(writePostAPI, action.data);
    // 해당 게시글 상세페이지로 이동
    yield Router.push(`/view/[id]`, `/view/${result.data.post_id}`);
    yield put({
      type: WRITE_POST_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WRITE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function updatePostAPI(data) {
  return axios.put(
    `/posts/${data.post_id}`,
    {
      category_id: data.category_id,
      title: data.title,
      content: data.content,
      attach_ids: data.attach_ids,
    },
    {
      headers: { Authorization: getAuthToken()?.access_token },
    },
  );
}

function* updatePost(action) {
  try {
    yield call(updatePostAPI, action.data);
    // 해당 게시글 상세페이지로 이동
    yield Router.back();
    yield put({
      type: UPDATE_POST_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function deletePostAPI(data) {
  return axios.delete(`/posts/${data.post_id}`, {
    headers: { Authorization: getAuthToken()?.access_token },
  });
}

function* deletePost(action) {
  try {
    yield call(deletePostAPI, action.data);
    yield put({
      type: DELETE_POST_SUCCESS,
    });
    // 메인 페이지로 이동
    yield Router.push("/");
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadRatingAPI(data) {
  return axios.get(`/posts/${data}/ratings`, {
    headers: { Authorization: getAuthToken()?.access_token },
  });
}

function* loadRating(action) {
  try {
    const result = yield call(loadRatingAPI, action.data);
    yield put({
      type: LOAD_RATING_SUCCESS,
      data: result.data.rating,
    });
  } catch (error) {
    yield put({
      type: LOAD_RATING_FAILURE,
      error: error.response?.data,
    });
  }
}

function deleteRatingAPI(data) {
  return axios.delete(`/posts/${data}/ratings`, {
    headers: { Authorization: getAuthToken()?.access_token },
  });
}

function* deleteRating(action) {
  try {
    yield call(deleteRatingAPI, action.data);
    yield put({
      type: DELETE_RATING_SUCCESS,
      data: 0,
    });
  } catch (error) {
    yield put({
      type: DELETE_RATING_FAILURE,
      error: error.response?.data,
    });
  }
}

function postRatingAPI(data) {
  return axios.post(
    `/posts/${data.post_id}/ratings`,
    { rating: data.rating },
    {
      headers: { Authorization: getAuthToken()?.access_token },
    },
  );
}

function* postRating(action) {
  try {
    yield call(postRatingAPI, action.data);
    yield put({
      type: POST_RATING_SUCCESS,
      data: 1,
    });
  } catch (error) {
    yield put({
      type: POST_RATING_FAILURE,
      error: error.response.data,
    });
  }
}

function loadCommentsAPI(data) {
  return axios.get(`/posts/${data.post_id}/comments?page=${data.page}&limit=100`);
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.data);
    yield put({
      type: LOAD_COMMENT_SUCCESS,
      data: result.data.comments,
    });
  } catch (error) {
    yield put({
      type: LOAD_COMMENT_FAILURE,
      error: error.response.data,
    });
  }
}

function writeCommentAPI(data) {
  return axios.post(
    `/posts/${data.post_id}/comments`,
    { content: data.content },
    {
      headers: { Authorization: getAuthToken()?.access_token },
    },
  );
}

function* writeComment(action) {
  try {
    const result = yield call(writeCommentAPI, action.data);
    yield put({
      type: WRITE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: WRITE_COMMENT_FAILURE,
      error: error.response.data,
    });
  }
}

function updateCommentAPI(data) {
  return axios.put(
    `/posts/${data.post_id}/comments/${data.comment_id}`,
    { content: data.content },
    {
      headers: { Authorization: getAuthToken()?.access_token },
    },
  );
}

function* updateComment(action) {
  try {
    const result = yield call(updateCommentAPI, action.data);
    yield put({
      type: UPDATE_COMMENT_SUCCESS,
      // data: result.data,
    });
  } catch (error) {
    yield put({
      type: UPDATE_COMMENT_FAILURE,
      error: error.response.data,
    });
  }
}

function deleteCommentAPI(data) {
  return axios.delete(`/posts/${data.post_id}/comments/${data.comment_id}`, {
    headers: { Authorization: getAuthToken()?.access_token },
  });
}

function* deleteComment(action) {
  try {
    const result = yield call(deleteCommentAPI, action.data);
    yield put({
      type: DELETE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: DELETE_COMMENT_FAILURE,
      error: error.response.data,
    });
  }
}

// 게시글 카테고리 불러오기
function* watchLoadCategory() {
  yield takeLatest(LOAD_CATEGORY_REQUEST, loadCategory);
}

// 사진 업로드
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

// 게시글 목록 불러오기
function* watchLoadPosts() {
  yield takeLatest(LOAD_POST_REQUEST, loadPosts);
}

// 게시글 상세 불러오기
function* watchLoadPostDetail() {
  yield takeLatest(LOAD_POST_DETAIL_REQUEST, loadPostDetail);
}

// 게시글 작성
function* watchWritePost() {
  yield takeLatest(WRITE_POST_REQUEST, writePost);
}

// 게시글 수정
function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}

// 게시글 삭제
function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

// 게시글 평가 불러오기
function* watchLoadRating() {
  yield takeLatest(LOAD_RATING_REQUEST, loadRating);
}

// 게시글 평가 삭제
function* watchDeleteRating() {
  yield takeLatest(DELETE_RATING_REQUEST, deleteRating);
}

// 게시글 평가
function* watchPostRating() {
  yield takeLatest(POST_RATING_REQUEST, postRating);
}

// 게시글 댓글 불러오기
function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENT_REQUEST, loadComments);
}

// 게시글 댓글 작성
function* watchWriteComment() {
  yield takeLatest(WRITE_COMMENT_REQUEST, writeComment);
}

// 게시글 댓글 수정
function* watchUpdateComment() {
  yield takeLatest(UPDATE_COMMENT_REQUEST, updateComment);
}

// 게시글 댓글 삭제
function* watchDeleteComment() {
  yield takeLatest(DELETE_COMMENT_REQUEST, deleteComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadCategory),
    fork(watchUploadImages),
    fork(watchLoadPosts),
    fork(watchWritePost),
    fork(watchUpdatePost),
    fork(watchDeletePost),
    fork(watchLoadPostDetail),
    fork(watchLoadRating),
    fork(watchDeleteRating),
    fork(watchPostRating),
    fork(watchLoadComments),
    fork(watchWriteComment),
    fork(watchUpdateComment),
    fork(watchDeleteComment),
  ]);
}
