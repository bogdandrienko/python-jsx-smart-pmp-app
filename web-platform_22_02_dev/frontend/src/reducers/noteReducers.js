import {
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_LIST_FAIL,

  NOTES_DETAIL_REQUEST,
  NOTES_DETAIL_SUCCESS,
  NOTES_DETAIL_FAIL,
} from "../constants/noteConstants";

export const notesListReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTES_LIST_REQUEST:
      return { loading: true, notes: [] };

    case NOTES_LIST_SUCCESS:
      return {
        loading: false,
        notes: action.payload,
      };

    case NOTES_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const notesDetailsReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTES_DETAIL_REQUEST:
      return { loading: true, ...state };

    case NOTES_DETAIL_SUCCESS:
      return {
        loading: false,
        notes: action.payload
      };

    case NOTES_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
