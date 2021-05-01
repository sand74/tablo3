import {
  SPEC_TECH_FETCH_ERROR,
  SPEC_TECH_FETCH_SUCCESS,
  SPEC_TECH_START_LOADING,
} from "../actions/actionTypes";

const initialState = {
  loading: true,
  error: null,
  items: [],
};

export default function specTechReducer(state = initialState, action) {
  switch (action.type) {
    case SPEC_TECH_START_LOADING:
      return {
        ...state,
        error: null,
        items: [],
        loading: true,
      };

    case SPEC_TECH_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        items: action.payload,
        loading: false,
      };

    case SPEC_TECH_FETCH_ERROR:
      return {
        ...state,
        items: [],
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
