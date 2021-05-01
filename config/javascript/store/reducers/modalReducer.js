import {
  MODAL_IS_OPEN,
  MODAL_FETCH_ERRORED,
  MODAL_START_LOADING,
  MODAL_FETCH_DATA_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  isModalOpen: false,
  loading: true,
  error: null,
  viewer: null,
  items: [],
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_IS_OPEN:
      return {
        ...state,
        isModalOpen: action.isModalOpen,
      };
    case MODAL_START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MODAL_FETCH_DATA_SUCCESS:
      return {
        ...state,
        items: action.items,
        viewer: action.viewer,
        loading: false,
      };
    case MODAL_FETCH_ERRORED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
}
