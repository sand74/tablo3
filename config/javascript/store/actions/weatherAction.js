import DataService from "../../services/DataService";
import {
  WEATHER_FETCH_ERROR,
  WEATHER_FETCH_SUCCESS,
  WEATHER_START_LOADING,
  WEATHER_WIN_OPEN,
  WEATHER_WIN_CLOSE,
} from "./actionTypes";

const dataService = new DataService();

export function weatherWinClose() {
  return {
    type: WEATHER_WIN_CLOSE,
  };
}

export function weatherWinOpen(x, y, selectItem) {
  return {
    type: WEATHER_WIN_OPEN,
    x,
    y,
    selectItem,
  };
}

export function weatherFetchError(error) {
  return {
    type: WEATHER_FETCH_ERROR,
    error,
  };
}

export function weatherStartLoading() {
  return {
    type: WEATHER_START_LOADING,
  };
}

export function weatherFetchSuccess(items, region) {
  const payload = {
    items,
    region,
  };

  return {
    type: WEATHER_FETCH_SUCCESS,
    payload,
  };
}

export function weatherFetchData(region) {
  return async (dispatch) => {
    dispatch(weatherStartLoading());
    try {
      const data = await dataService.getWeather(region);
      dispatch(weatherFetchSuccess(data, region));
    } catch (error) {
      console.log("Error:", error);
      dispatch(weatherFetchError(error));
    }
  };
}
