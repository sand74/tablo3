import DataService from "../../services/DataService";
import {
  TABLO_TOGGLE_MAIN_MAP,
  TABLO_FETCH_ERROR,
  TABLO_FETCH_SUCCESS,
  TABLO_START_LOADING,
} from "./actionTypes";

const dataService = new DataService();

function tabloFetchError(error) {
  return {
    type: TABLO_FETCH_ERROR,
    payload: error,
  };
}

function tabloStartLoading() {
  return {
    type: TABLO_START_LOADING,
  };
}

function tabloFetchSuccess(items) {
  return {
    type: TABLO_FETCH_SUCCESS,
    payload: items,
  };
}

export function tabloFetchData() {
  return async (dispatch) => {
    dispatch(tabloStartLoading());
    try {
      const data = await dataService.getDivisions();
      dispatch(tabloFetchSuccess(data));
    } catch (error) {
      console.log("Error:", error);
      dispatch(tabloFetchError(error));
    }
  };
}

export function toggleMainMap(payload) {
  return {
    type: TABLO_TOGGLE_MAIN_MAP,
    payload: payload,
  };
}
