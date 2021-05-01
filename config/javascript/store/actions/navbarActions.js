import DataService from "../../services/DataService"
import {
  NAVBAR_FETCH_ERRORED,
  NAVBAR_FETCH_DATA_SUCCESS,
  NAVBAR_START_LOADING,
} from "./actionTypes";

const KEY = "left_box";

const dataService = new DataService()

export function navbarFetchError(error) {
  return {
    type: NAVBAR_FETCH_ERRORED,
    error,
  };
}

export function navbarStartLoading() {
  return {
    type: NAVBAR_START_LOADING,
  };
}

export function navbarFetchDataSuccess(items) {
  return {
    type: NAVBAR_FETCH_DATA_SUCCESS,
    items,
  };
}

export function navbarFetchDataSlow(url) {
  const slowPromise = () => new Promise((resolve) => setTimeout(resolve, 3000));

  return async () => {
    await slowPromise();
    navbarFetchData(url);
  };
}


export function navbarFetchData() {
  return async (dispatch) => {

    dispatch(navbarStartLoading())
    try {
      const data = await dataService.getMenu()
       dispatch(navbarFetchDataSuccess(data[KEY]))
    } catch (error) {
      console.log("Error:", error)
      dispatch(navbarFetchError(error))
    }

  }
}

