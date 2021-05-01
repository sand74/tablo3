import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import informReducer from "./informReducer";
import layerReducer from "./layerReducer";
import navbarReducer from "./navbarReducer";
import forecastReducer from "./forecatsReducer";
import stormReducer from "./stormReducer";
import tabloReducer from "./tabloReducer";
import weatherReducer from "./weatherReducer";
import snowTechReducer from "./snowTechReducer";
import pipeCountReducer from "./pipeReducer";
import specTechReducer from "./specTechReducer";
import gpsReducer from "./gpsReducer";

export default combineReducers({
  modal: modalReducer,
  inform: informReducer,
  layer: layerReducer,
  navbar: navbarReducer,
  forecast: forecastReducer,
  storm: stormReducer,
  tablo: tabloReducer,
  weather: weatherReducer,
  snowTech: snowTechReducer,
  pipe: pipeCountReducer,
  specTech: specTechReducer,
  gps: gpsReducer,
});
