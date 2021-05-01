import {
  PIPE_FETCH_ERROR,
  PIPE_START_LOADING,
  PIPE_FETCH_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  loading: true,
  error: null,
  items: [],
  region: 0,
};

export default function pipeCountReducer(state = initialState, action) {
  switch (action.type) {
    case PIPE_START_LOADING:
      return {
        ...state,
        error: null,
        items: [],
        loading: true,
        region: 0,
      };

    case PIPE_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        items: action.payload.items,
        loading: false,
        region: action.payload.region,
      };

    case PIPE_FETCH_ERROR:
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
