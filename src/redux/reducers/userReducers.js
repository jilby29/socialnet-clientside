import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST,
  MARK_NOTIFICATION_READ,
  OPEN_DIALOG,
} from "../types";

const initialState = {
  notifications: [],
  authenticated: false,
  loading: false,
  open: false,
  credentials: {},
  likes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };

    case SET_UNAUTHENTICATED:
      return initialState;

    case SET_USER:
      return {
        loading: false,
        authenticated: true,

        ...action.payload,
      };

    case LOADING_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            signupuser: state.credentials.signupuser,
            postid: action.payload.postid,
          },
        ],
      };

    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.postid !== action.payload.postid
        ),
      };

    case MARK_NOTIFICATION_READ:
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state,
      };

    case OPEN_DIALOG:
      return {
        ...state,
        open: true,
      };

    default:
      return state;
  }
}
