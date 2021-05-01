import {
  TABLO_TOGGLE_MAIN_MAP,
  TABLO_FETCH_ERROR,
  TABLO_FETCH_SUCCESS,
  TABLO_START_LOADING,
} from "../actions/actionTypes";

const initialState = {
  items: null,
  error: null,
  loading: false,
  url: "",
  legend: "",
  img: "",
  toggle: true,
  name: "",
  gpsImg: "",
  gpsName: "",
  gpsToggle: false,
};

export default function tabloReducer(state = initialState, action) {
  switch (action.type) {
    case TABLO_TOGGLE_MAIN_MAP:
      return {
        ...state,
        ...action.payload,
      };
    case TABLO_START_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        items: null,
      };
    case TABLO_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.payload,
      };
    case TABLO_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        items: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
