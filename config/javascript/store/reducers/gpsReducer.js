import {
  GPS_FETCH_ERROR,
  GPS_FETCH_SUCCESS,
  GPS_START_LOADING,
  GPS_RESET_CODE,
} from "../actions/actionTypes";

const initialState = {
  stantion: null,
  loading: false,
  error: null,
};

const gpsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GPS_START_LOADING:
      return {
        ...state,
        loading: true,
        stantion: null,
      };
    case GPS_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GPS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        stantion: action.payload,
      };
    case GPS_RESET_CODE:
      return {
        ...state,
        stantion: {
          code: null,
          region: 0,
        },
      };
    default:
      return state;
  }
};

export default gpsReducer;
