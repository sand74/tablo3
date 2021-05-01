import DataService from "../../services/DataService";
import {
  SPEC_TECH_FETCH_ERROR,
  SPEC_TECH_FETCH_SUCCESS,
  SPEC_TECH_START_LOADING,
} from "./actionTypes";

const dataService = new DataService();

function specTechFetchError(error) {
  return {
    type: SPEC_TECH_FETCH_ERROR,
    payload: error,
  };
}

function specTechStartLoading() {
  return {
    type: SPEC_TECH_START_LOADING,
  };
}

function specTechFetchSuccess(items) {
  return {
    type: SPEC_TECH_FETCH_SUCCESS,
    payload: items,
  };
}

export function specTechFetchData(region) {
  return async (dispatch) => {
    dispatch(specTechStartLoading());
    try {
      const data = await dataService.getSpecTech(region);
      dispatch(specTechFetchSuccess(data, region));
    } catch (error) {
      console.log("Error:", error);
      dispatch(specTechFetchError(error));
    }
  };
}
