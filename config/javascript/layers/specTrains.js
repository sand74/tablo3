import * as d3 from "d3";
import { showToolTip, hiddenTootTip } from "../utils/tabloUtils";

export function eventSpecTrains(props) {
  const nlist = d3.selectAll("#spec_trains");
  const prpList = nlist.selectAll("g[id^='prp_']");
  const vpList = nlist.selectAll("g[id^='vp_']");

  prpList
    .on("click", function () {
      // const current = e.currentTarget;
      // const id = current.id;
      //console.log("click:", this);
      //current);
      //const id = this.id;
      // props.openModal(true);
      // props.fetchData(id, "spes_prp");
    })
    .on("mouseenter", function () {
      //prpList.style("cursor", "pointer");
      if (!props.specTechLoad) {
        const id = this.id;

        const hits = props.specTechData.find((i) => i.id === id);

        const arrTxt = [];
        let endStr = null;
        hits.text.forEach((element) => {
          if (element.includes("Всего")) {
            endStr = element;
          } else {
            arrTxt.push(element);
          }
        });

        if (endStr) {
          arrTxt.push(`<hr>${endStr}`);
        }

        const txt = `<div style="text-align: left;">${arrTxt.join(
          "<br>"
        )}</div>`;

        showToolTip(txt);
      }
    })
    .on("mouseleave", function () {
      hiddenTootTip();
    });

  vpList
    .on("click", function () {
      // const current = e.currentTarget;

      //console.log("click:", this);
      const id = this.id;
      //current);

      props.openModal(true);
      props.fetchData(id, "spec_vp");
    })
    .on("mouseenter", function () {
      vpList.style("cursor", "pointer");
    })
    .on("mouseleave", function () {
      vpList.style("cursor", "default");
    });
}

export function resetSpecTrains() {
  const nlist = d3.selectAll("#spec_trains");
  const prpList = nlist.selectAll("g[id^='prp_']");
  const vpList = nlist.selectAll("g[id^='vp_']");

  prpList.on("click", null).on("mouseenter", null).on("mouseleave", null);
  vpList.on("click", null).on("mouseenter", null).on("mouseleave", null);
}

// function handlerClick(element, { fetchHealthData, openModal }) {
//   const uid = element.getAttribute("id");
//   openModal(true);
//   fetchHealthData(uid);
// }
