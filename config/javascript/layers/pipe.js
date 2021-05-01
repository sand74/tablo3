import * as d3 from "d3";

export function eventPipeHandler(props) {
  const nlist = d3.selectAll("#tubes").selectAll("g[id^='isso_']");

  nlist
    .on("click", function () {
      handlerClick(this, props);
    })
    .on("mouseenter", () => nlist.style("cursor", "pointer"))
    .on("mouseleave", () => nlist.style("cursor", "default"));
}

export function resetPipeHandler() {
  const nlist = d3.selectAll("#tubes").selectAll("g[id^='isso_']");

  nlist.on("click", null).on("mouseenter", null).on("mouseleave", null);
}

function handlerClick(element, { fetchPipeData, openModal }) {
  const uid = element.getAttribute("id");
  openModal(true);
  fetchPipeData(uid);
}

export function loadPipeCount(props) {
  if (props.stormRegionID === props.pipeRegion && !props.pipeLoad) {
    showPipeCount(props.pipeData);
  }
}

function showPipeCount(items) {
  const nlist = d3.selectAll("#tubes");

  items.forEach((item) => {
    const node = nlist.select(`#${item.id_peregon}`);
    if (node !== null) {
      node.select("tspan").text(item.cnt);
    }
  });
}
