import * as d3 from "d3";

export function eventHealthHandler(props) {
  const nlist = d3.selectAll("#health_org").selectAll("g[id^='fsk_']");

  nlist
    .on("click", function () {
      handlerClick(this, props);
    })
    .on("mouseenter", () => nlist.style("cursor", "pointer"))
    .on("mouseleave", () => nlist.style("cursor", "default"));
}

export function resetHealthHandler() {
  const nlist = d3.selectAll("#health_org").selectAll("g[id^='fsk_']");

  nlist.on("click", null).on("mouseenter", null).on("mouseleave", null);
}

function handlerClick(element, { fetchHealthData, openModal }) {
  const uid = element.getAttribute("id");
  openModal(true);
  fetchHealthData(uid);
}
