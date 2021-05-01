import {
  LAYER_SHOW_CHECKED,
  LAYER_REFRESH,
  LAYER_FIND_STANTION,
  LAYER_RESET_ZOOM,
} from "./actionTypes";
import * as d3 from "d3";

export function postShowLayer(layers) {
  return {
    type: LAYER_SHOW_CHECKED,
    layers: layers,
  };
}

export function postFindCode(code) {
  return {
    type: LAYER_FIND_STANTION,
    code: code,
  };
}

export function postResetZoom(resetFunction) {
  return {
    type: LAYER_RESET_ZOOM,
    resetZoom: resetFunction,
  };
}

export function postRefreshLayer(layers) {
  return {
    type: LAYER_REFRESH,
    layers: scanLayer(layers),
  };
}

function scanLayer(layers) {
  const newLayers = layers.map((item) => {
    let dis = item.disabled;
    item.layer.split(" ").forEach((text) => {
      const selectLayer = d3.selectAll("#" + text.trim());
      if (selectLayer.node()) {
        dis = false;
      } else {
        dis = true;
      }
    });
    return { ...item, disabled: dis };
  });

  return newLayers;
}
