import { INFO_LEGEND_KEY, INFO_SPEC_KEY } from "../actions/actionTypes";

const initialState = {
  legend: "",
  spec: "",
};

export default function informReducer(state = initialState, action) {
  switch (action.type) {
    case INFO_LEGEND_KEY:
      return {
        ...state,
        legend: action.legend,
      };
    case INFO_SPEC_KEY:
      return {
        ...state,
        spec: action.spec,
      };

    default:
      return state;
  }
}
