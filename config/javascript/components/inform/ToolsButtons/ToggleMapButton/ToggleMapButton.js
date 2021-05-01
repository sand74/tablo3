import React, { useEffect } from "react";
import { connect } from "react-redux";
import classes from "./ToggleMapButton.module.css";
import { toggleMainMap } from "../../../../store/actions/tabloAction";
import { hiddenTootTip, showToolTip } from "../../../../utils/tabloUtils";

const applicationInitialState = window.__INITIAL_STATE__;
const mainmap = applicationInitialState.main;

let initStorage = {};

function loadStorage() {
  const mapLocal = localStorage.getItem("map");

  if (mapLocal) {
    initStorage = JSON.parse(mapLocal);

    if (!initStorage.legend) {
      localStorage.removeItem("map");

      initStorage.url = mainmap.map.url;
      initStorage.legend = mainmap.map.img_leg;
      initStorage.img = "./svg/icons/button/flat.svg";
      initStorage.toggle = true;
      initStorage.name = "Geo map";

      const mapRaw = JSON.stringify(initStorage);
      localStorage.setItem("map", mapRaw);
    }
  } else {
    initStorage.url = mainmap.map.url;
    initStorage.legend = mainmap.map.img_leg;
    initStorage.img = "./svg/icons/button/flat.svg";
    initStorage.toggle = true;
    initStorage.name = "Geo map";
  }
  return initStorage;
}

const ToggleMapButton = ({ toggleMainMap, name, img, toggle }) => {
  useEffect(() => {
    toggleMainMap(loadStorage());
  }, [toggleMainMap]);

  const handleToggleButton = () => {
    let mainMapObj = {};

    if (toggle) {
      mainMapObj = {
        url: mainmap.big_map.url,
        legend: mainmap.big_map.img_leg,
        img: "./svg/icons/button/map.svg",
        toggle: false,
        name: "Symbol map",
      };
    } else {
      mainMapObj = {
        url: mainmap.map.url,
        legend: mainmap.map.img_leg,
        img: "./svg/icons/button/flat.svg",
        toggle: true,
        name: "Geo map",
      };
    }

    const mapRaw = JSON.stringify(mainMapObj);
    localStorage.setItem("map", mapRaw);
    toggleMainMap(mainMapObj);
  };

  const handleMouseEnter = (e) => {
    const x = e.pageX;
    const y = e.pageY;

    const text = "Переключение<br/>вида карты";

    showToolTip(text, x, y, "down");
  };

  const handleMouseLeave = () => {
    hiddenTootTip();
  };

  return (
    <div className={classes.ToggleMapButton}>
      <img
        src={img}
        alt={name}
        onClick={handleToggleButton}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

const mapDispathToProps = {
  toggleMainMap,
};

const mapStateToProps = (state) => {
  return {
    name: state.tablo.name,
    img: state.tablo.img,
    toggle: state.tablo.toggle,
  };
};

export default connect(mapStateToProps, mapDispathToProps)(ToggleMapButton);
