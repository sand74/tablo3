import {
  STORM_START_LOADING,
  STORM_FETCH_ERRORED,
  STORM_REGION_FETCH_SUCCESS,
  STORM_ALL_FETCH_SUCCESS,
  STORM_REGION_UPDATE_SUCCESS,
  STORM_ALL_UPDATE_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  loading: true,
  error: null,
  items: [],
  clickFunction: null,
  id: 0,
};

export default function stormReducer(state = initialState, action) {
  switch (action.type) {
    case STORM_START_LOADING:
      return {
        error: null,
        items: [],
        loading: true,
        clickFunction: state.clickFunction,
        id: 0,
      };
    case STORM_REGION_FETCH_SUCCESS:
      return {
        error: null,
        items: action.payload.items,
        clickFunction: action.payload.clickFunction,
        loading: false,
        id: action.payload.id,
      };

    case STORM_ALL_FETCH_SUCCESS:
      return {
        error: null,
        items: action.payload.items,
        clickFunction: action.payload.clickFunction,
        loading: false,
        id: 0,
      };

    case STORM_REGION_UPDATE_SUCCESS:
      return {
        error: null,
        items: action.payload.items,
        clickFunction: state.clickFunction,
        loading: false,
        id: action.payload.id,
      };

    case STORM_ALL_UPDATE_SUCCESS:
      return {
        error: null,
        items: action.payload.items,
        clickFunction: state.clickFunction,
        loading: false,
        id: 0,
      };

    case STORM_FETCH_ERRORED:
      return {
        items: [],
        error: action.error,
        loading: false,
        clickFunction: null,
        id: 0,
      };

    default:
      return state;
  }
}
