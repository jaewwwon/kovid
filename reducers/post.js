import produce from "immer";

export const initialState = {
  posts: [], // 게시글 리스트
  postCategory: null, // 게시글 카테고리
  postInfo: null, // 게시글 상세정보
  rating: null, // 게시글 평가값
  comments: [], // 게시글 댓글
  imageUrls: [], // 이미지 경로 (배열)
  imageUrl: null, // 이미지 경로 (단일)
  uploadImagesLoading: false, // 이미지 로딩 상태
  uploadImageSuccess: false, // 이미지 업로드 성공
  uploadImagesError: null, // 이미지 업로드 에러 메시지
  loadPostLoading: false, // 게시글 로딩 상태
  loadPostError: null, // 게시글 로드 에러 메시지
  postLoading: false, // 게시글 (작성/수정) 로딩 상태
  postSuccess: false, // 게시글 (작성/수정) 완료 상태
  postError: null, // 게시글 (작성/수정) 에러 메시지
  loadPostDetailError: null, // 게시글 상세 에러 메시지
  loadRatingError: null,
  deleteRatingSuccess: false, // 게시글 평가 삭제 성공
  postRatingLoading: false, // 게시글 평가 로딩 상태
  postRatingError: null, // 게시글 평가 실패 메시지
  loadCommentsLoading: false, // 댓글 로딩 상태
  loadCommentsError: null, // 댓글 로드 에러 메시지
  commentLoading: false, // 댓글 (작성, 수정, 삭제) 로딩 상태
  commentSuccess: false, // 댓글 (작성, 수정, 삭제) 완료 상태
  commentError: null, // 댓글 (작성, 수정, 삭제) 에러 메시지
};

// action name
export const LOAD_CATEGORY_REQUEST = "LOAD_CATEGORY_REQUEST";
export const LOAD_CATEGORY_SUCCESS = "LOAD_CATEGORY_SUCCESS";
export const LOAD_CATEGORY_FAILURE = "LOAD_CATEGORY_FAILURE";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const DELETE_IMAGE = "DELETE_IMAGE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const LOAD_POST_DETAIL_REQUEST = "LOAD_POST_DETAIL_REQUEST";
export const LOAD_POST_DETAIL_SUCCESS = "LOAD_POST_DETAIL_SUCCESS";
export const LOAD_POST_DETAIL_FAILURE = "LOAD_POST_DETAIL_FAILURE";

export const WRITE_POST_REQUEST = "WRITE_POST_REQUEST";
export const WRITE_POST_SUCCESS = "WRITE_POST_SUCCESS";
export const WRITE_POST_FAILURE = "WRITE_POST_FAILURE";

export const WRITE_POST_CANCEL = "WRITE_POST_CANCEL";

export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

export const LOAD_RATING_REQUEST = "LOAD_RATING_REQUEST";
export const LOAD_RATING_SUCCESS = "LOAD_RATING_SUCCESS";
export const LOAD_RATING_FAILURE = "LOAD_RATING_FAILURE";

export const DELETE_RATING_REQUEST = "DELETE_RATING_REQUEST";
export const DELETE_RATING_SUCCESS = "DELETE_RATING_SUCCESS";
export const DELETE_RATING_FAILURE = "DELETE_RATING_FAILURE";

export const POST_RATING_REQUEST = "POST_RATING_REQUEST";
export const POST_RATING_SUCCESS = "POST_RATING_SUCCESS";
export const POST_RATING_FAILURE = "POST_RATING_FAILURE";

export const LOAD_COMMENT_REQUEST = "LOAD_COMMENT_REQUEST";
export const LOAD_COMMENT_SUCCESS = "LOAD_COMMENT_SUCCESS";
export const LOAD_COMMENT_FAILURE = "LOAD_COMMENT_FAILURE";

export const WRITE_COMMENT_REQUEST = "WRITE_COMMENT_REQUEST";
export const WRITE_COMMENT_SUCCESS = "WRITE_COMMENT_SUCCESS";
export const WRITE_COMMENT_FAILURE = "WRITE_COMMENT_FAILURE";

export const UPDATE_COMMENT_REQUEST = "UPDATE_COMMENT_REQUEST";
export const UPDATE_COMMENT_SUCCESS = "UPDATE_COMMENT_SUCCESS";
export const UPDATE_COMMENT_FAILURE = "UPDATE_COMMENT_FAILURE";

export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

// action
// export const writePostAction = (data) => ({
//   type: WRITE_POST_REQUEST,
//   data,
// });

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CATEGORY_REQUEST: {
      return {
        ...state,
        postCategory: null,
      };
    }
    case LOAD_CATEGORY_SUCCESS: {
      return {
        ...state,
        postCategory: action.data,
      };
    }
    case LOAD_CATEGORY_FAILURE: {
      return {
        ...state,
        postCategory: null,
      };
    }
    case UPLOAD_IMAGES_REQUEST: {
      return {
        ...state,
        uploadImagesLoading: true,
        uploadImageSuccess: false,
        uploadImagesError: null,
        imageUrl: null,
      };
    }
    case UPLOAD_IMAGES_SUCCESS: {
      return {
        ...state,
        imageUrls: [...state.imageUrls, ...action.data],
        imageUrl: action.data,
        uploadImageSuccess: true,
        uploadImagesLoading: false,
      };
    }
    case UPLOAD_IMAGES_FAILURE: {
      return {
        ...state,
        uploadImagesLoading: false,
        uploadImagesError: action.error,
      };
    }
    case DELETE_IMAGE: {
      return {
        ...state,
        imageUrls: state.imageUrls.filter((v) => v.attachId !== action.attachId),
      };
    }
    case LOAD_POST_REQUEST: {
      return {
        ...state,
        loadPostLoading: true,
        loadPostError: null,
        posts: [],
      };
    }
    case LOAD_POST_SUCCESS: {
      return {
        ...state,
        loadPostLoading: false,
        posts: action.data,
      };
    }
    case LOAD_POST_FAILURE: {
      return {
        ...state,
        loadPostLoading: false,
        loadPostError: action.error,
        posts: [],
      };
    }
    case LOAD_POST_DETAIL_REQUEST: {
      return {
        ...state,
        postInfo: null,
        loadPostLoading: true,
        loadPostDetailError: null,
        imageUrl: null,
      };
    }
    case LOAD_POST_DETAIL_SUCCESS: {
      return {
        ...state,
        loadPostLoading: false,
        postInfo: action.data,
      };
    }
    case LOAD_POST_DETAIL_FAILURE: {
      return {
        ...state,
        loadPostLoading: false,
        loadPostDetailError: action.error,
      };
    }
    case WRITE_POST_REQUEST:
    case UPDATE_POST_REQUEST:
    case DELETE_POST_REQUEST: {
      return {
        ...state,
        postError: null,
        postLoading: true,
        postSuccess: false,
      };
    }
    case WRITE_POST_SUCCESS:
    case UPDATE_POST_SUCCESS:
    case DELETE_POST_SUCCESS: {
      return {
        ...state,
        postLoading: false,
        postSuccess: true,
        imageUrls: [],
      };
    }
    case WRITE_POST_FAILURE:
    case UPDATE_POST_FAILURE:
    case DELETE_POST_FAILURE: {
      return {
        ...state,
        postLoading: false,
        postError: action.error,
      };
    }
    case WRITE_POST_CANCEL: {
      return {
        ...state,
        imageUrls: [],
      };
    }
    case LOAD_RATING_REQUEST: {
      return {
        ...state,
        loadRatingError: null,
        rating: null,
      };
    }
    case LOAD_RATING_SUCCESS: {
      return {
        ...state,
        rating: action.data,
      };
    }
    case LOAD_RATING_FAILURE: {
      return {
        ...state,
        loadRatingError: action.error,
      };
    }
    case DELETE_RATING_REQUEST: {
      return {
        ...state,
        // loadRatingError: null,
        deleteRatingSuccess: false,
      };
    }
    case DELETE_RATING_SUCCESS: {
      return {
        ...state,
        rating: action.data,
        deleteRatingSuccess: true,
      };
    }
    case DELETE_RATING_FAILURE: {
      return {
        ...state,
        // loadRatingError: action.error,
      };
    }
    case POST_RATING_REQUEST: {
      return {
        ...state,
        postRatingLoading: true,
        postRatingError: null,
      };
    }
    case POST_RATING_SUCCESS: {
      return {
        ...state,
        postInfo: {
          ...state.postInfo,
          // liked: state.postInfo.liked + 1,
        },
        postRatingLoading: false,
      };
    }
    case POST_RATING_FAILURE: {
      return {
        ...state,
        postRatingLoading: false,
        postRatingError: action.error,
      };
    }
    case LOAD_COMMENT_REQUEST: {
      return {
        ...state,
        comments: [],
        loadCommentsLoading: true,
        loadCommentsError: null,
      };
    }
    case LOAD_COMMENT_SUCCESS: {
      return {
        ...state,
        comments: action.data,
        loadCommentsLoading: false,
      };
    }
    case LOAD_COMMENT_FAILURE: {
      return {
        ...state,
        loadCommentsLoading: false,
        loadCommentsError: action.error,
      };
    }
    case WRITE_COMMENT_REQUEST:
    case UPDATE_COMMENT_REQUEST:
    case DELETE_COMMENT_REQUEST: {
      return {
        ...state,
        commentLoading: true,
        commentSuccess: false,
        commentError: null,
      };
    }
    case WRITE_COMMENT_SUCCESS:
    case UPDATE_COMMENT_SUCCESS:
    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        commentLoading: false,
        commentSuccess: true,
      };
    }
    case WRITE_COMMENT_FAILURE:
    case UPDATE_COMMENT_FAILURE:
    case DELETE_COMMENT_FAILURE: {
      return {
        ...state,
        commentLoading: false,
        commentError: action.error,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
