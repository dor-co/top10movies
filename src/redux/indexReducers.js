import moviesReducer from "./Reducers";
import firestoreReducer from "./FirestoreReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  moviesReducer,
  firestoreReducer
});

export default allReducers;