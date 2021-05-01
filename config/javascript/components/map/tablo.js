import * as d3 from "d3";
//import socketIOClient from "socket.io-client";
import { addEventLayer, removeEventLayer } from "./layerEvents";
//import Stantion from "./Stantion";
import Piket from "./Piket";
import DataService from "../../services/DataService";
import {
  showToolTip,
  hiddenTootTip,
  getCodePiket,
} from "../../utils/tabloUtils";

import { hideDivision } from "../../utils/stantionUtils";

const applicationInitialState = window.__INITIAL_STATE__;
const regions = applicationInitialState.regions;
const ports = applicationInitialState.ports;
const config = applicationInitialState.config;

//let stantion = {};
let pikets = {};
let parentProps;

const dataService = new DataService();
//const socket = socketIOClient(wsocket.endpoint);

// dataService.getDivisions().then((json) => {
//   for (const t of json) {
//     let key = t.ks.substr(0, 5);
//     let stn = new Stantion(t.ks, t.ms, t.km, t.nodes);
//     stantion[key] = stn;
//   }
// });

dataService.getPiket().then((json) => {
  for (const t of json.data) {
    let code = t.code;
    let id_piket = t.id_piket;
    const params = [];
    params.push(t.param1);
    params.push(t.param2);
    params.push(t.param3);

    let piket = new Piket(code, id_piket, params);
    pikets[id_piket] = piket;
  }
});

export function ShowLayer(props) {
  const layers = props.showLayer;
  layers.forEach((block) => {
    if (Array.isArray(block.data)) {
      block.data.forEach((element) => {
        if (element.show) {
          element.layer.split(" ").forEach((text) => {
            addEventLayer(text.trim(), props);
            const selectLayer = d3.selectAll("#" + text.trim());
            selectLayer.attr("opacity", "1");
          });
        } else {
          element.layer.split(" ").forEach((text) => {
            removeEventLayer(text.trim(), props);
            const selectLayer = d3.selectAll("#" + text.trim());
            selectLayer.attr("opacity", "0");
          });
        }
      });
    }
  });
}

export function loadMapORW(fprops) {
  hideDivision(fprops);

  parentProps = fprops;
  const mainUrl = parentProps.tabloUrl || "./svg/tablo.svg";
  const legendURL = parentProps.tabloLegend || "./svg/legend.svg";

  parentProps.postLegend(legendURL);

  d3.xml(mainUrl).then((xml) => {
    let box = document.querySelector("#map");
    box.innerHTML = "";
    let svg = xml.documentElement;

    svg.setAttribute("preserveAspectRatio", "xMidYMin");
    box.appendChild(xml.documentElement);
    d3.selectAll("title").remove();

    parentProps.postStorm(0, clickStormFromORW);

    //eventDivisions(parentProps);
    eventRegion();
    eventPiket();
    eventPorts(0);
  });
}

function clickStormFromORW(uid) {
  const selectRegion = `nod${uid}`;
  const url = regions[selectRegion].url;

  if (typeof url !== undefined) {
    let img = regions[selectRegion].img_leg;
    parentProps.postLegend(img);
    parentProps.postSpec(
      regions[selectRegion].img_spec ? regions[selectRegion].img_spec : null
    );

    parentProps.forecastFetchData(regions[selectRegion].id);
    parentProps.forecastOpen();

    loadRegions(url, regions[selectRegion].id);
  }
}

function loadRegions(url_reg, idRegion) {
  d3.xml(url_reg).then((xml) => {
    let box = document.querySelector("#map");
    box.innerHTML = "";

    let svg = xml.documentElement;
    svg.setAttribute("preserveAspectRatio", "xMidYMin");
    box.appendChild(xml.documentElement);
    d3.selectAll("title").remove();

    parentProps.postStorm(idRegion, clickStormFromRegion);
    parentProps.postWeather(idRegion);
    parentProps.postSnowTech(idRegion);
    parentProps.postPipeCount(idRegion);
    parentProps.fectchSpecTechData(idRegion);

    let close_btn = d3.select("#close_button");
    close_btn
      .on("click", () => {
        parentProps.postSpec(null);
        parentProps.forecastClose();

        loadMapORW(parentProps);
      })
      .on("mouseenter", () => close_btn.attr("opacity", "0.98"))
      .on("mouseleave", () => close_btn.attr("opacity", "0.595982143"));

    go_region();
    //eventDivisions();
    eventPiket();
    eventPorts(idRegion);
    //  eventLayer("snow_tech");
    //addToolTip("#train_fire");
  });
}

function clickStormFromRegion(uid) {
  parentProps.openModal(true);
  parentProps.fetchStormData(uid);
}

//=========== Region ======

function eventRegion() {
  const regions = d3.select("#buttons").selectAll("g");

  regions
    .on("mouseenter", reg_mousein)
    .on("mouseleave", reg_mouseout)
    .on("click", reg_click);
}

function reg_click() {
  let node = d3.select(this).attr("id");

  if (node != null) {
    let url = regions[node].url;
    if (typeof url !== undefined) {
      let img = regions[node].img_leg;
      parentProps.postLegend(img);
      parentProps.postSpec(
        regions[node].img_spec ? regions[node].img_spec : null
      );

      // const prognozUrl = config.prognoz.toString() + regions[node].id;
      // parentProps.forecastFetchData(prognozUrl);
      parentProps.forecastFetchData(regions[node].id);
      parentProps.forecastOpen();
      //parentProps.postStormIconsFetch(regions[node].id);
      loadRegions(url, regions[node].id);
    }
  }
}

function reg_mouseout() {
  d3.select(this).selectAll("rect").attr("fill-opacity", "0.35");
}

function reg_mousein() {
  let d = d3.select(this).selectAll("rect");
  d.attr("fill-opacity", "1");
}

//========== go Regions ==========

function go_region() {
  const go_regions = d3.select("#go_region").selectAll("*");

  go_regions
    .on("mouseenter", go_reg_mousein)
    .on("mouseleave", go_reg_mouseout)
    .on("click", go_reg_click);
}

function go_reg_mousein() {
  const reg = d3.select(this);
  reg.style("opacity", "0.58");
}
function go_reg_mouseout() {
  const reg = d3.select(this);
  reg.style("opacity", "1");
}
function go_reg_click() {
  const reg = d3.select(this);

  let reg_id = reg.attr("id");
  let item = regions[reg_id];

  if (typeof item !== "undefined") {
    parentProps.postLegend(item.img_leg);
    parentProps.postSpec(item.img_spec ? item.img_spec : null);

    // const prognozUrl = config.prognoz.toString() + item.id;
    // parentProps.forecastFetchData(prognozUrl);
    parentProps.forecastFetchData(item.id);
    parentProps.forecastOpen();

    loadRegions(item.url, item.id);
  }
}

export function findRegion(code) {
  const item = regions[`nod${code}`];

  if (typeof item !== "undefined") {
    parentProps.postLegend(item.img_leg);
    parentProps.postSpec(item.img_spec ? item.img_spec : null);

    // const prognozUrl = config.prognoz.toString() + item.id;
    // parentProps.forecastFetchData(prognozUrl);
    parentProps.forecastFetchData(item.id);
    parentProps.forecastOpen();

    loadRegions(item.url, item.id);
    //parentProps.postFindStantion(stn);
  }
}

//============= Piket =======
function eventPiket() {
  const piketElements = d3.selectAll("#terms > *");
  piketElements
    .on("mouseenter", piketMouseIn)
    .on("mouseleave", piketMouseLeave)
    .on("click", piketClick);
}

function piketMouseLeave() {
  this.setAttribute("opacity", "0.4");
  hiddenTootTip();
  // d3.select(".stooltip").style("visibility", "hidden");
  // d3.select(".stooltip").html("");
  // d3.select(".stooltip").style("heigth", "");
}

function piketMouseIn() {
  this.setAttribute("opacity", "1");
  let code = getCodePiket(this);
  let obj = pikets[code];
  if (typeof obj != "undefined") {
    let txt = pikets[code].getParamsTxt();
    txt = txt.replace(/,/g, "<br>");

    showToolTip(txt);
  }
}

function piketClick() {
  getCodePiket(this);
}

function eventPorts(parent) {
  const portsElements = d3.selectAll('g[id^="port"]');
  portsElements
    .on("mouseenter", portMouseIn)
    .on("mouseleave", portMouseLeave)
    .on("click", function () {
      portClick(this, parent);
    });
}

function portMouseIn() {
  const circle = this.children[0];
  circle.setAttribute("fill", "#d0f0ff");
}

function portMouseLeave() {
  const circle = this.children[0];
  circle.setAttribute("fill", "#ffffff");
}

function portClick(element, parentId) {
  const stn = element.parentElement;
  const id = stn.getAttribute("id");
  if (ports[id]) {
    const urlPorts = ports[id].url;
    if (urlPorts) {
      parentProps.forecastFetchData(ports[id].region);
      parentProps.forecastOpen();
      loadPortMap(urlPorts, parentId, ports[id]);
    }
  }
}

function loadPortMap(url, parentId, port) {
  parentProps.postLegend(null);
  parentProps.postSpec(null);

  d3.xml(url).then((xml) => {
    let box = document.querySelector("#map");
    box.innerHTML = "";

    let svg = xml.documentElement;
    svg.setAttribute("preserveAspectRatio", "xMidYMin");
    box.appendChild(xml.documentElement);
    d3.selectAll("title").remove();

    const infoButton = d3.select("#info_button");

    infoButton
      .on("click", () => {
        const fname = port.file;

        if (fname) {
          const link = config.port_dir;
          //console.log(link);
          const path = window.location.href;
          //console.log(path);
          const url = new URL(link, path);
          url.searchParams.set("name", fname);

          window.open(url.href);
        }
      })
      .on("mouseenter", () =>
        infoButton.select("circle").attr("fill", "#d0f0ff")
      )
      .on("mouseleave", () =>
        infoButton.select("circle").attr("fill", "#ffffff")
      );

    const close_btn = d3.select("#close_button");
    close_btn
      .on("click", () => {
        if (parentId === 0) {
          parentProps.postSpec(null);
          parentProps.forecastClose();
          loadMapORW(parentProps);
        } else {
          const node = getKeyById(regions, parentId);
          const urlNode = regions[node].url;
          const img = regions[node].img_leg;

          parentProps.postLegend(img);
          parentProps.postSpec(
            regions[node].img_spec ? regions[node].img_spec : null
          );

          loadRegions(urlNode, parentId);
        }
      })
      .on("mouseenter", () => close_btn.attr("opacity", "0.98"))
      .on("mouseleave", () => close_btn.attr("opacity", "0.595982143"));
  });

  function getKeyById(object, id) {
    return Object.keys(object).find((key) => object[key].id === id);
  }
}
