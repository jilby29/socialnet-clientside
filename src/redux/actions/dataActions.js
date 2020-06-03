import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  CREATE_POST,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  STOP_LOADING,
  GET_POST,
  POST_COMMENT,
} from "../types";
import axios from "axios";

//get All the post
export const getAllPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/getAllposts")
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: SET_POSTS, payload: [] });
    });
};
//like post

export const likePost = (postid) => (dispatch) => {
  axios
    .get(`/post/${postid}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//unlike post
export const unlikePost = (postid) => (dispatch) => {
  axios
    .get(`/post/${postid}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletepost = (postid) => (dispatch) => {
  axios
    .delete(`/post/${postid}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postid });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createpost = (newpost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/createpost", newpost)
    .then((res) => {
      dispatch({ type: CREATE_POST, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const expandpost = (postid) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/post/${postid}`)
    .then((res) => {
      dispatch({ type: GET_POST, payload: res.data });
      dispatch({ type: STOP_LOADING });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postcomment = (postid, commentdata) => (dispatch) => {
  axios
    .post(`/post/${postid}/comment`, commentdata)
    .then((res) => {
      dispatch({ type: POST_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getUserDetails = (signupuser) => (dispatch) => {
  axios
    .get(`/user/${signupuser}`)
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data.userposts });
    })
    .catch(() => {
      dispatch({ type: SET_POSTS, payload: null });
    });
};
