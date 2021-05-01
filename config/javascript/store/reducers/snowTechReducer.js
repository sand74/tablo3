import {
  SNOW_TECH_FETCH_ERROR,
  SNOW_TECH_FETCH_SUCCESS,
  SNOW_TECH_START_LOADING,
} from "../actions/actionTypes";

const initialState = {
  loading: true,
  error: null,
  items: [],
  region: 0,
};

export default function snowTechReducer(state = initialState, action) {
  switch (action.type) {
    case SNOW_TECH_START_LOADING:
      return {
        ...state,
        error: null,
        items: [],
        loading: true,
        region: 0,
      };

    case SNOW_TECH_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        items: action.payload.items,
        loading: false,
        region: action.payload.region,
      };

    case SNOW_TECH_FETCH_ERROR:
      return {
        isOpen: false,
        items: [],
        error: action.error,
        loading: false,
        region: 0,
      };

    default:
      return state;
  }
}
