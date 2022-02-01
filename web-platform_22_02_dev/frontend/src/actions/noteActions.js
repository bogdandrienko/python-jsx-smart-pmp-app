import {
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_DETAIL_REQUEST,
  NOTES_DETAIL_SUCCESS,
  NOTES_DETAIL_FAIL,
} from "../constants/noteConstants";
import axios from "axios";

export const listNotes =
  (userInfo = {}) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_LIST_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
        Authorization: `Bearer ${userInfo.token}`,
      };

      const { data } = await axios.get(`/api/note_api/`, config);
      console.log(data);
      dispatch({
        type: NOTES_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NOTES_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const detailNotes = (id) => async (dispatch) => {
  try {
    dispatch({
      type: NOTES_DETAIL_REQUEST,
    });
    const { data } = await axios.get(`/api/note_api/${id}`);
    console.log(data);
    dispatch({
      type: NOTES_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NOTES_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
