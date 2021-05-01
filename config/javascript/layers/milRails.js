import { selectAll } from "d3";

export function addEvent(props) {
  // mil_5_6  mil_rails
  const nlist = selectAll("#mil_rails").selectAll("g[id^='mil_']");

  nlist
    .on("click", function () {
      handlerClick(this, props);
    })
    .on("mouseenter", () => nlist.style("cursor", "pointer"))
    .on("mouseleave", () => nlist.style("cursor", "default"));
}

export function resetEvent() {
  const nlist = selectAll("#tubes").selectAll("g[id^='isso_']");

  nlist.on("click", null).on("mouseenter", null).on("mouseleave", null);
}

function handlerClick(element, { fetchMilRails, openModal }) {
  const uid = element.getAttribute("id");
  console.log("mil:", uid);
  openModal(true);
  fetchMilRails(uid);
}
