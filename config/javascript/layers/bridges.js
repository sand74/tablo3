import * as d3 from "d3";

export function eventBridgeHandler(props) {
  const nlist = d3.selectAll("#bridges").selectAll("#icon");

  nlist
    .on("click", function () {
      handlerClick(this, props);
    })
    .on("mouseenter", () => nlist.style("cursor", "pointer"))
    .on("mouseleave", () => nlist.style("cursor", "default"));
}

export function resetBridgeHandler() {
  const nlist = d3.selectAll("#bridges").selectAll("#icon");

  nlist.on("click", null).on("mouseenter", null).on("mouseleave", null);
}

function handlerClick(element, props) {
  const node = element.parentElement;
  const uid = node.getAttribute("id");

  props.openModal(true);
  props.fetchBridgeData(uid);
}
