import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  CREATE_POST,
  GET_POST,
  POST_COMMENT,
} from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case LIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.postid === action.payload.postid
      );
      state.posts[index] = action.payload;
      if (state.post.postid === action.payload.postid) {
        state.post = action.payload;
      }
      return {
        ...state,
      };
    case UNLIKE_POST:
      index = state.posts.findIndex(
        (post) => post.postid === action.payload.postid
      );
      state.posts[index] = action.payload;
      if (state.post.postid === action.payload.postid) {
        state.post = action.payload;
      }
      return {
        ...state,
      };

    case DELETE_POST:
      index = state.posts.findIndex((post) => post.postid === action.payload);

      state.posts.splice(index, 1);
      return {
        ...state,
      };

    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };

    case POST_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };
    default:
      return state;
  }
}
