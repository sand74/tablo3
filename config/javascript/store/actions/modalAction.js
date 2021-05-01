import DataService from "../../services/DataService";
import {
  MODAL_IS_OPEN,
  MODAL_FETCH_ERRORED,
  MODAL_START_LOADING,
  MODAL_FETCH_DATA_SUCCESS,
} from "./actionTypes";

const dataService = new DataService();

export function ModalIsOpen(bool) {
  return {
    type: MODAL_IS_OPEN,
    isModalOpen: bool,
  };
}

export function modalFetchError(e) {
  return {
    type: MODAL_FETCH_ERRORED,
    error: e,
  };
}

export function modalStartLoading() {
  return {
    type: MODAL_START_LOADING,
  };
}

export function modalFetchDataSuccess(items, viewer = null) {
  return {
    type: MODAL_FETCH_DATA_SUCCESS,
    viewer,
    items,
  };
}

export function modalFetchData(id, label = "pokaz") {
  return async (dispatch) => {
    dispatch(modalStartLoading());
    try {
      const data = await dataService.getPokaz(id, label);
      dispatch(modalFetchDataSuccess(data));
    } catch (error) {
      console.log("Error:", error);
      dispatch(modalFetchError(error));
    }
  };
}

export function modalStormFetchData(id) {
  return async (dispatch) => {
    dispatch(modalStartLoading());
    try {
      const data = await dataService.getStormPokaz(id);
      dispatch(modalFetchDataSuccess(data, "list"));
    } catch (error) {
      console.log("Error:", error);
      dispatch(modalFetchError(error));
    }
  };
}

export function modalBridgeFetchData(id) {
  return async (dispatch) => {
    dispatch(modalStartLoading());
    try {
      const data = await dataService.getBridgePokaz(id);
      dispatch(modalFetchDataSuccess(data));
    } catch (error) {
      console.log("Error:", error);
      dispatch(modalFetchError(error));
    }
  };
}

export function modalPipeFetchData(id) {
  return async (dispatch) => {
    dispatch(modalStartLoading());
    try {
      const data = await dataService.getPipePokaz(id);
      dispatch(modalFetchDataSuccess(data, "pipe"));
    } catch (error) {
      console.log("Error:", error);
      dispatch(modalFetchError(error));
    }
  };
}

export function modalSnowFetchData(id) {
  return async (dispatch) => {
    dispatch(modalStartLoading());
    try {
      const data = await dataService.getSnowPokaz(id);
      dispatch(modalFetchDataSuccess(data));
    } catch (error) {
      console.log("Error:", error);
      dispatch(modalFetchError(error));
    }
  };
}

export function modalHealthFetchData(id) {
  return async (dispatch) => {
    dispatch(modalStartLoading());
    try {
      const data = await dataService.getHealthInfo(id);
      dispatch(modalFetchDataSuccess(data));
    } catch (error) {
      console.log("Error:", error);
      dispatch(modalFetchError(error));
    }
  };
}

export function modalMilRailsFetchData(id) {
  return async (dispatch) => {
    dispatch(modalStartLoading());
    try {
      const data = await dataService.getMilRailsPokaz(id);
      dispatch(modalFetchDataSuccess(data));
    } catch (error) {
      console.log("Error:", error);
      dispatch(modalFetchError(error));
    }
  };
}