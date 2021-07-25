import moviesReducer from "./Reducers";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  moviesReducer
});

export default allReducers;