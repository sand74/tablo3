import { INFO_LEGEND_KEY, INFO_SPEC_KEY } from "./actionTypes";

export function informLegendKey(legend) {
  return {
    type: INFO_LEGEND_KEY,
    legend: legend,
  };
}

export function informSpecKey(spec) {
  return {
    type: INFO_SPEC_KEY,
    spec: spec,
  };
}
