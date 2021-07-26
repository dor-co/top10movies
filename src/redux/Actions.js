import * as actions from "./Consts";

export const open = (modalHeader, modalBody, modalTitle, modalCategory, modalRate, movieId, movieImg) => {
  return {
    type: actions.OPEN_MODAL,
    header: modalHeader,
    body: modalBody,
    title: modalTitle,
    category: modalCategory,
    rate: modalRate,
    id: movieId,
    img: movieImg
  };
};

export const close = () => {
  return {
    type: actions.CLOSE_MODAL,
  };
};

export const getData = (movie) => {
  return {
    type: actions.GET_MOVIES_DATA,
    data: movie
  };
};