import DataService from "../../services/DataService";
import {
  FORECAST_FETCH_ERRORED,
  FORECAST_START_LOADING,
  FORECAST_CLOSE,
  FORECAST_OPEN,
  FORECAST_FETCH_DATA_SUCCESS,
} from "./actionTypes";

const dataService = new DataService();

export function forecastClose() {
  return {
    type: FORECAST_CLOSE,
  };
}

export function forecastOpen() {
  return {
    type: FORECAST_OPEN,
  };
}

export function forecastFetchError(error) {
  return {
    type: FORECAST_FETCH_ERRORED,
    error: error,
  };
}

export function forecastStartLoading() {
  return {
    type: FORECAST_START_LOADING,
  };
}

export function forecastFetchDataSuccess(items) {
  return {
    type: FORECAST_FETCH_DATA_SUCCESS,
    items,
  };
}

export function forecastFetchData(id) {
  return async (dispatch) => {
    dispatch(forecastStartLoading());
    try {
      const data = await dataService.getPrognoz(id);
      dispatch(forecastFetchDataSuccess(data));
    } catch (error) {
      console.log("Error:", error);
      dispatch(forecastFetchError(error));
    }
  };
}
