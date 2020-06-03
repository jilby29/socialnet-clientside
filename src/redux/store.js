import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//Reducers

import userReducers from "./reducers/userReducers";
import dataReducers from "./reducers/dataReducers";
import uiReducers from "./reducers/uiReducers";

const initialState = {};

const middlware = [thunk];

const reducers = combineReducers({
  user: userReducers,
  data: dataReducers,
  UI: uiReducers,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middlware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
