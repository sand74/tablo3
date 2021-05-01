import DataService from "../../services/DataService";
import {
  STORM_FETCH_ERRORED,
  STORM_START_LOADING,
  STORM_REGION_FETCH_SUCCESS,
  STORM_ALL_FETCH_SUCCESS,
  STORM_REGION_UPDATE_SUCCESS,
  STORM_ALL_UPDATE_SUCCESS,
} from "./actionTypes";

const dataService = new DataService();

export function stormStartLoad() {
  return {
    type: STORM_START_LOADING,
  };
}

export function stormFetchError(error) {
  return {
    type: STORM_FETCH_ERRORED,
    error,
  };
}

export function stormRegionFetchSuccess(items, id, clickFunction) {
  const payload = {
    items,
    clickFunction,
    id,
  };

  return {
    type: STORM_REGION_FETCH_SUCCESS,
    payload,
  };
}

export function stormRegionUpdateSuccess(items, id) {
  const payload = {
    items,
    id,
  };

  return {
    type: STORM_REGION_UPDATE_SUCCESS,
    payload,
  };
}

export function stormAllFetchSuccess(items, clickFunction) {
  const payload = {
    items,
    clickFunction,
  };
  return {
    type: STORM_ALL_FETCH_SUCCESS,
    payload,
  };
}

export function stormAllUpdateSuccess(items) {
  const payload = {
    items,
  };
  return {
    type: STORM_ALL_UPDATE_SUCCESS,
    payload,
  };
}

export function stormFetchData(id, clickFunction) {
  return async (dispatch) => {
    dispatch(stormStartLoad());
    try {
      if (id === 0) {
        const data = await dataService.getStormAll();
        dispatch(stormAllFetchSuccess(data, clickFunction));
      } else {
        const data = await dataService.getStormRegion(id);
        dispatch(stormRegionFetchSuccess(data, id, clickFunction));
      }
    } catch (error) {
      console.log("Error:", error);
      dispatch(stormFetchError(error));
    }
  };
}

export function stormUpdateData(id) {
  return async (dispatch) => {
    dispatch(stormStartLoad());
    try {
      if (id === 0) {
        const data = await dataService.getStormAll();
        dispatch(stormAllUpdateSuccess(data));
      } else {
        const data = await dataService.getStormRegion(id);
        dispatch(stormRegionUpdateSuccess(data, id));
      }
    } catch (error) {
      console.log("Error:", error);
      dispatch(stormFetchError(error));
    }
  };
}
