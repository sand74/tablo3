import * as d3 from "d3";

const deltaColor = 111;
const colorWork = "#05C62E";
const colorCrach = "#FF1002";

function clearSnowRoute() {
  const nlist = document.querySelectorAll('g[id^="snow_route_"]');
  nlist.forEach((node) => node.setAttribute("opacity", "0"));
}

function clickHandlerSnowRoute(element, props) {
  const id = element.id;

  const numId = id.slice(5);

  props.openModal(true);
  props.fetchSnowData(id);

  const nodeList = document.querySelectorAll('g[id^="snow_route_"]');

  nodeList.forEach((node) => {
    const nodeId = node.getAttribute("id");

    const idRoute = nodeId.slice(11);

    if (idRoute === numId) {
      const opacity = node.getAttribute("opacity");
      if (opacity === "1") {
        node.setAttribute("opacity", "0");
        element.blur();
      } else {
        node.setAttribute("opacity", "1");
      }
    } else {
      node.setAttribute("opacity", "0");
    }
  });
}

function focusInHandler() {
  const rect = d3.select(this).select("rect");
  const fill = rect.attr("fill");
  const colorNumber = Number.parseInt(`0x${fill.slice(-6)}`);
  const newColor = colorNumber - deltaColor;
  rect.attr("fill", `#${newColor.toString(16)}`);
}

function focusOutHandler() {
  const rect = d3.select(this).select("rect");
  const fill = rect.attr("fill");
  const colorNumber = Number.parseInt(`0x${fill.slice(-6)}`);
  const newColor = colorNumber + deltaColor;
  rect.attr("fill", `#${newColor.toString(16)}`);
}

export function loadSnowStatus(props) {
  if (props.stormRegionID === props.snowTechRegion && !props.snowTechLoad) {
    showSnowTechStatus(props.snowTechData);
  }
}

function showSnowTechStatus(data) {
  const layers = d3.selectAll("#snow_tech");

  data.forEach((item) => {
    const tech = layers.select(`#${item.id_map}`).select("circle");

    if (tech) {
      if (item.status === "работа") {
        tech.attr("fill", colorWork);
        tech.attr("opacity", "1");
      } else if (item.status === "ремонт") {
        tech.attr("fill", colorCrach);
        tech.attr("opacity", "1");
      } else {
        tech.attr("opacity", "0");
      }
    }
  });
}

export function addSnowTechEvent(props) {
  if (!props.snowTechLoad) {
    const { snowTechData } = props;

    const layers = d3.selectAll("#snow_tech");
    snowTechData.forEach((item) => {
      const node = layers.select(`#${item.id_map}`);
      node
        .on("click", function () {
          clickHandlerSnowRoute(this, props);
        })
        .on("focusin", focusInHandler)
        .on("focusout", focusOutHandler)
        .on("mouseenter", () => node.style("cursor", "pointer"))
        .on("mouseleave", () => node.style("cursor", "default"));
    });
  }
}

export function resetSnowTechEvent() {
  clearSnowRoute();
  const nodes = d3.selectAll("#snow_tech > *");

  nodes
    .on("click", null)
    .on("focusin", null)
    .on("focusout", null)
    .on("mouseenter", null)
    .on("mouseleave", null);
}
