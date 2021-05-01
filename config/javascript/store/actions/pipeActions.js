import DataService from "../../services/DataService";
import {
  PIPE_FETCH_ERROR,
  PIPE_START_LOADING,
  PIPE_FETCH_SUCCESS,
} from "./actionTypes";

const dataService = new DataService();

function pipeFetchError(error) {
  return {
    type: PIPE_FETCH_ERROR,
    error,
  };
}

function pipeStartLoading() {
  return {
    type: PIPE_START_LOADING,
  };
}

function pipeFetchSuccess(items, region) {
  const payload = {
    items,
    region,
  };

  return {
    type: PIPE_FETCH_SUCCESS,
    payload,
  };
}

export function pipeFetchData(region) {
  return async (dispatch) => {
    dispatch(pipeStartLoading());
    try {
      const data = await dataService.getPipeCount(region);
      dispatch(pipeFetchSuccess(data, region));
    } catch (error) {
      console.log("Error:", error);
      dispatch(pipeFetchError(error));
    }
  };
}
