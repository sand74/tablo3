import {
  NAVBAR_FETCH_ERRORED,
  NAVBAR_FETCH_DATA_SUCCESS,
  NAVBAR_START_LOADING,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  items: [],
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case NAVBAR_START_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case NAVBAR_FETCH_DATA_SUCCESS:
      return {
        ...state,
        items: action.items,
        loading: false,
      };
    case NAVBAR_FETCH_ERRORED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
}
