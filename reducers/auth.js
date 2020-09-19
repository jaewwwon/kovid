import produce from "immer";

export const initialState = {
  terms: null, // 회원가입 약관
  termsLoading: false, // 약관 로딩 상태
  termsError: null, // 약관 로딩 에러 메시지
};

// action name
export const LOAD_TERMS_REQUEST = "LOAD_TERMS_REQUEST";
export const LOAD_TERMS_SUCCESS = "LOAD_TERMS_SUCCESS";
export const LOAD_TERMS_FAILURE = "LOAD_TERMS_FAILURE";

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TERMS_REQUEST: {
      return {
        ...state,
        termsLoading: true,
        termsError: null,
      };
    }
    case LOAD_TERMS_SUCCESS: {
      return {
        ...state,
        terms: action.data,
        termsLoading: false,
      };
    }
    case LOAD_TERMS_FAILURE: {
      return {
        ...state,
        terms: null,
        termsLoading: false,
        logInError: action.error,
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
