import * as d3 from "d3";
import { showToolTip, hiddenTootTip } from "../utils/tabloUtils";

export function loadWeatherIcon(props) {
  if (props.stormRegionID === props.weatherRegion && !props.weatherLoad) {
    showIconWeather(props.weatherItems, props.weatherWinOpen);
  }
}

function showIconWeather(items, clickFunction) {
  d3.xml("./svg/icons/weather_banner2.svg").then((xml) => {
    const el = xml.documentElement.getElementsByTagName("g")[0];

    items.forEach((element) => {
      //console.log(element.map_id);
      const anchorNode = d3.select("#weather_st").select(`#${element.map_id}`);
      if (anchorNode.node()) {
        anchorNode.attr("opacity", "1");
        const elClone = el.cloneNode(true);
        insertParam(elClone, element);
        elClone.addEventListener("click", (event) =>
          handleClickIcon(event, element, clickFunction)
        );
        elClone.addEventListener("mouseenter", (event) =>
          handleMouseEnterIcon(event, element)
        );
        elClone.addEventListener("mouseleave", (event) =>
          handleMouseLeaveIcon(event, element)
        );
        anchorNode.node().appendChild(elClone);
      }
    });
  });
}

export function testLoad(props) {
  // console.log(props.weatherRegion);
  // console.log("Load:", props.weatherLoad);
  // console.log("Items:", props.weatherItems);
  if (props.stormRegionID === props.weatherRegion && !props.weatherLoad) {
    // console.log("start show items");
  }
}

export function cleanIconWeather() {
  const nodeList = d3.selectAll('g[id ^= "wst_"]');
  nodeList.attr("opacity", "0");
  nodeList.selectAll("#Page-1").remove();
}

function insertParam(node, params) {
  const visNode = node.querySelector("#visib > *");
  const tempNode = node.querySelector("#temp > *");
  const windNode = node.querySelector("#wind > *");

  const vis = isNaN(params.visibility) ? "?" : params.visibility;

  visNode.textContent = `${vis} км`;
  tempNode.textContent = `${params.temperature}  C`;
  windNode.textContent = `${params.wind_speed} м/с`;
  //console.log(visNode.textContent);
}

function handleClickIcon(e, item, winOpen) {
  // console.log("click:", e, item);
  e.stopPropagation();
  hiddenTootTip();
  winOpen(e.pageX, e.pageY, item);
}

function handleMouseEnterIcon(e, item) {
  const info = `Температура: ${item.temperature} C<br/>
  Ветер: ${item.wind_speed} м/с<br/>Видимость:${item.visibility} км`;

  showToolTip(info, e.pageX, e.pageY);
}

function handleMouseLeaveIcon(e, item) {
  hiddenTootTip();
}

export function showWeather(items) {
  //console.log("weather items:", items);
}
