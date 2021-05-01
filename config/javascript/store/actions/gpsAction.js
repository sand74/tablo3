import DataService from "../../services/DataService";
import {
  GPS_FETCH_ERROR,
  GPS_FETCH_SUCCESS,
  GPS_START_LOADING,
  GPS_RESET_CODE,
} from "./actionTypes";

const dataService = new DataService();

function gpsFetchError(payload) {
  return {
    type: GPS_FETCH_ERROR,
    payload,
  };
}

function gpsStartLoading() {
  return {
    type: GPS_START_LOADING,
  };
}

function gpsFetchSuccess(payload) {
  return {
    type: GPS_FETCH_SUCCESS,
    payload,
  };
}

export function fetchGPS(long, lat) {
  return async (dispatch) => {
    dispatch(gpsStartLoading());
    try {
      const data = await dataService.getGPS(long, lat);
      //console.log("get data:", data);
      dispatch(gpsFetchSuccess(data));
    } catch (error) {
      console.log("Error:", error);
      dispatch(gpsFetchError(error));
    }
  };
}

export function resetGPS() {
  return {
    type: GPS_RESET_CODE,
  };
}
