import {
  WEATHER_FETCH_ERROR,
  WEATHER_FETCH_SUCCESS,
  WEATHER_START_LOADING,
  WEATHER_WIN_OPEN,
  WEATHER_WIN_CLOSE,
} from "../actions/actionTypes";

const initialState = {
  isOpen: false,
  loading: true,
  error: null,
  items: [],
  region: 0,
  x: 0,
  y: 0,
  selectItem: null,
};

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case WEATHER_WIN_CLOSE:
      return {
        ...state,
        isOpen: false,
      };
    case WEATHER_WIN_OPEN:
      return {
        ...state,
        x: action.x,
        y: action.y,
        isOpen: true,
        selectItem: action.selectItem,
      };
    case WEATHER_START_LOADING:
      return {
        ...state,
        error: null,
        items: [],
        loading: true,
        region: 0,
        selectItem: null,
      };

    case WEATHER_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        items: action.payload.items,
        loading: false,
        region: action.payload.region,
      };

    case WEATHER_FETCH_ERROR:
      return {
        isOpen: false,
        items: [],
        error: action.error,
        loading: false,
        clickFunction: null,
        region: 0,
        x: 0,
        y: 0,
        selectItem: null,
      };

    default:
      return state;
  }
}
