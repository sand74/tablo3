import * as d3 from "d3";
import { getCodeStn, showToolTip, hiddenTootTip } from "./tabloUtils";

export function eventDivisions(props) {
  const stansions = d3.selectAll("#st");

  stansions
    .on("mouseenter", function () {
      st_mousein(this, props.stantionItems);
    })
    .on("mouseleave", st_mouseout)
    .on("click", function () {
      st_click(this, props);
    });
}

function st_mousein(element, stantion) {
  let code = getCodeStn(element);

  let obj = stantion[code];
  if (typeof obj != "undefined") {
    let txt = stantion[code].getNodesTxt();
    txt = txt.replace(/,/g, "<br>");
    let km = stantion[code].getKMtxt();
    if (km) {
      txt = txt + " <br> <hr>  " + km;
    }

    showToolTip(txt);
  }
}

function st_mouseout() {
  hiddenTootTip();
}

function st_click(element, props) {
  const stantion = props.stantionItems;
  d3.select(".context").selectAll("div").remove();

  d3.select(".stooltip").style("visibility", "hidden");

  let code = getCodeStn(element);
  let obj = stantion[code];
  if (typeof obj != "undefined") {
    const context = d3.select(".context");

    for (const item of obj.nodes) {
      context
        .append("div")
        .attr("id", item.id)
        .attr("class", "node bgcolor")
        .text(item.name)
        .on("click", function () {
          node_click(this, props);
        });
    }

    let x = d3.event.pageX;
    let y = d3.event.pageY;
    let h = d3.select(".context").style("height");
    let w = d3.select(".context").style("width");
    let dy = Number.parseInt(h.substr(0, h.length - 2)) + 10;
    let dx = Number.parseInt(w.substr(0, w.length - 2)) + 10;

    if (y - dy < 0) {
      d3.select(".context").style("top", y - 10 + "px");
      d3.select(".context").style("left", x - dx + "px");
      d3.select(".context").style("visibility", "visible");
    } else {
      d3.select(".context").style("top", y - dy + "px");
      d3.select(".context").style("left", x - dx + "px");
      d3.select(".context").style("visibility", "visible");
    }

    d3.event.stopPropagation();
  }
}

function node_click(element, props) {
  props.openModal(true);
  props.fetchData(element.id);
}

export function hideDivision(props) {
  d3.select("body").on("click", () => {
    d3.select(".context").style("visibility", "hidden");
    props.weatherWinClose();
  });
}
