import {
  LAYER_SHOW_CHECKED,
  LAYER_REFRESH,
  LAYER_FIND_STANTION,
  LAYER_RESET_ZOOM,
} from "../actions/actionTypes";

const initialState = {
  layers: [],
  findCode: "",
  resetZoom: null,
};

export default function layerReducer(state = initialState, action) {
  switch (action.type) {
    case LAYER_SHOW_CHECKED:
      return {
        ...state,
        layers: action.layers,
      };
    case LAYER_REFRESH:
      return {
        ...state,
        layers: action.layers,
      };
    case LAYER_FIND_STANTION:
      return {
        ...state,
        findCode: action.code,
      };
    case LAYER_RESET_ZOOM:
      return {
        ...state,
        resetZoom: action.resetZoom,
      };

    default:
      return state;
  }
}
