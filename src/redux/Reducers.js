import * as actions from "./Consts";

const initialState = {
  boolOpen: false,
  modalHeader: '',
  body: '',
  title: '',
  category: '',
  rate: '',
  id: ''
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.OPEN_MODAL:
      return {
        boolOpen: true,
        modalHeader: action.header,
        body: action.body,
        title: action.title,
        category: action.category,
        rate: action.rate,
        id: action.id
      };
    case actions.CLOSE_MODAL:
      return {
        boolOpen: false
      };

    default:
      return state;
  }
};

export default moviesReducer;
