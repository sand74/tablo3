import DataService from "../../services/DataService";
import {
  SNOW_TECH_FETCH_ERROR,
  SNOW_TECH_FETCH_SUCCESS,
  SNOW_TECH_START_LOADING,
} from "./actionTypes";

const dataService = new DataService();

export function snowTechFetchError(error) {
  return {
    type: SNOW_TECH_FETCH_ERROR,
    error,
  };
}

export function snowTechStartLoading() {
  return {
    type: SNOW_TECH_START_LOADING,
  };
}

export function snowTechFetchSuccess(items, region) {
  const payload = {
    items,
    region,
  };

  return {
    type: SNOW_TECH_FETCH_SUCCESS,
    payload,
  };
}

export function snowTechFetchData(region) {
  return async (dispatch) => {
    dispatch(snowTechStartLoading());
    try {
      const data = await dataService.getSnowTech(region);
      dispatch(snowTechFetchSuccess(data, region));
    } catch (error) {
      console.log("Error:", error);
      dispatch(snowTechFetchError(error));
    }
  };
}
