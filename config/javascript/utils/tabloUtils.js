import * as d3 from "d3";

export function showToolTip(text = "", x = 0, y = 0, vid = "auto") {
  if (text === "") {
    return;
  }
  d3.select(".stooltip").html(text);
  if (x === 0) x = parseInt(d3.event.pageX);
  if (y === 0) y = parseInt(d3.event.pageY);
  const h = d3.select(".stooltip").style("height");
  const dy = Number.parseInt(h.substr(0, h.length - 2)) + 15;

  switch (vid) {
    case "auto":
      if (y - (dy + 5) < 0) {
        d3.select(".stooltip").style("top", y + 15 + "px");
      } else {
        d3.select(".stooltip").style("top", y - dy + "px");
      }
      break;
    case "down":
      d3.select(".stooltip").style("top", y + 15 + "px");
      break;
    case "up":
      d3.select(".stooltip").style("top", y - dy + "px");

      break;
    default:
      break;
  }

  d3.select(".stooltip").style("left", x + "px");
  d3.select(".stooltip").style("visibility", "visible");
}

export function hiddenTootTip() {
  d3.select(".stooltip").style("visibility", "hidden");
  d3.select(".stooltip").html("");
  d3.select(".stooltip").style("heigth", "");
}

export function getCodeStn(element) {
  let el1 = d3.select(element.parentElement);

  let stn = el1.attr("id");
  return stn.substr(3, stn.length);
}

export function getCodePiket(element) {
  let el1 = d3.select(element);
  let piket = el1.attr("id");
  return piket;
}

export function addToolTip(elementId, text) {
  const nodes = document.querySelectorAll(elementId);

  nodes.forEach((item) => {
    console.dir(item);
  });
}
