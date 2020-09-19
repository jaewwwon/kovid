import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import post from "./post";
import auth from "./auth";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      // console.log("HYDRATE", action);
      // return action.payload;
      return {
        ...state,
        post: { ...action.payload.post },
      };
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
        auth,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
