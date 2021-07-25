import * as actions from "./Consts";

const initialState = {
  data: []
};

const firestoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_MOVIES_DATA:
      return {
        data: action.data
      };

    default:
      return state;
  }
};

export default firestoreReducer;
