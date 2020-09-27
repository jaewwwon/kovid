import produce from "immer";

export const initialState = {
  userExistResult: "", // 사용자 중복 확인 결과
  signUpLoading: false, // 회원가입 로딩 상태
  signUpError: null, // 회원가입 에러 메시지
  signUpSuccess: null, // 회원가입 완료 상태
  logInLoading: false, // 로그인 로딩 상태
  logInError: null, // 로그인 에러 메시지
  logOutError: null, // 로그아웃 에러 메시지
  updateNicknameSuccess: false, // 닉네임 변경 성공
  updateNicknameError: null, // 닉네임 변경 에러 메시지
  updatePasswordSuccess: false, // 비밀번호 변경 성공
  updatePasswordError: null, // 비밀번호 변경 에러 메시지
  findPasswordSuccess: false, // 비밀번호 찾기 요청 성공
  findPasswordError: null, // 비밀번호 찾기 요청 에러 메시지
  profile: null, // 회원 정보
};

// action name
export const LOAD_USER_INFO = "LOAD_USER_INFO";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const UPDATE_NICKNAME_REQUEST = "UPDATE_NICKNAME_REQUEST";
export const UPDATE_NICKNAME_SUCCESS = "UPDATE_NICKNAME_SUCCESS";
export const UPDATE_NICKNAME_FAILURE = "UPDATE_NICKNAME_FAILURE";

export const UPDATE_PASSWORD_REQUEST = "UPDATE_PASSWORD_REQUEST";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export const UPDATE_PASSWORD_FAILURE = "UPDATE_PASSWORD_FAILURE";

export const LEAVE_USER_REQUEST = "LEAVE_USER_REQUEST";
export const LEAVE_USER_SUCCESS = "LEAVE_USER_SUCCESS";
export const LEAVE_USER_FAILURE = "LEAVE_USER_FAILURE";

export const FIND_PASSWORD_REQUEST = "FIND_PASSWORD_REQUEST";
export const FIND_PASSWORD_SUCCESS = "FIND_PASSWORD_SUCCESS";
export const FIND_PASSWORD_FAILURE = "FIND_PASSWORD_FAILURE";

export const NICKNAME_STATE_INIT = "NICKNAME_STATE_INIT";
export const PASSWORD_STATE_INIT = "PASSWORD_STATE_INIT";

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_INFO: {
      return {
        ...state,
        profile: action.data,
      };
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        profile: null,
        logInLoading: true,
        logInError: null,
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        profile: action.data,
        logInLoading: false,
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        profile: null,
        logInLoading: false,
        logInError: action.error,
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        logOutError: null,
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        profile: null,
        logOutError: null,
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        logOutError: action.error,
      };
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        signUpLoading: true,
        signUpSuccess: false,
        signUpError: null,
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        signUpLoading: false,
        signUpSuccess: true,
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        signUpLoading: false,
        signUpSuccess: false,
        signUpError: action.error,
      };
    }
    case NICKNAME_STATE_INIT: {
      return {
        ...state,
        updateNicknameSuccess: false,
        updateNicknameError: null,
      };
    }
    case PASSWORD_STATE_INIT: {
      return {
        ...state,
        updatePasswordSuccess: false,
        updatePasswordError: null,
      };
    }
    case UPDATE_NICKNAME_REQUEST: {
      return {
        ...state,
        updateNicknameSuccess: false,
        updateNicknameError: null,
      };
    }
    case UPDATE_NICKNAME_SUCCESS: {
      return {
        ...state,
        updateNicknameSuccess: true,
        profile: {
          ...state.profile,
          user: {
            ...state.profile.user,
            profile_nickname: action.data,
          },
        },
      };
    }
    case UPDATE_NICKNAME_FAILURE: {
      return {
        ...state,
        updateNicknameError: action.error,
      };
    }
    case UPDATE_PASSWORD_REQUEST: {
      return {
        ...state,
        updatePasswordSuccess: false,
        updatePasswordError: null,
      };
    }
    case UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        updatePasswordSuccess: true,
      };
    }
    case UPDATE_PASSWORD_FAILURE: {
      return {
        ...state,
        updatePasswordError: action.error,
      };
    }
    case LEAVE_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case LEAVE_USER_SUCCESS: {
      return {
        ...state,
        profile: null,
      };
    }
    case LEAVE_USER_FAILURE: {
      return {
        ...state,
      };
    }
    case FIND_PASSWORD_REQUEST: {
      return {
        ...state,
        findPasswordSuccess: false,
        findPasswordError: null,
      };
    }
    case FIND_PASSWORD_SUCCESS: {
      return {
        ...state,
        findPasswordSuccess: true,
      };
    }
    case FIND_PASSWORD_FAILURE: {
      return {
        ...state,
        findPasswordError: action.error,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

// export default (state = initialState, action) => {
//   return produce(state, draft => {
//     switch (action.type) {
//       case PROFILE_LOAD.request:
//         draft.loading = true
//         return
//       default:
//         return state
//     }
//   })
// }

export default reducer;
