import React, { useEffect } from "react";
import classes from "./ToggleGpsButton.module.css";
import { connect } from "react-redux";
import { hiddenTootTip, showToolTip } from "../../../../utils/tabloUtils";
import { toggleMainMap } from "../../../../store/actions/tabloAction";
import { loadStorage } from "../../../../utils/gpsUtils";
//import { fetchGPS } from "../../../../store/actions/gpsAction";
//import { findRegion } from "../../../map/tablo";

const ToggleGpsButton = ({ toggleMainMap, gpsName, gpsImg, gpsToggle }) => {
  useEffect(() => {
    const storage = loadStorage();
    toggleMainMap(storage);
  }, [toggleMainMap]);

  const handleToggleButton = () => {
    const mainGpsObj = {};

    if (gpsToggle) {
      mainGpsObj.gpsImg = "./svg/icons/button/gps_off.svg";
      mainGpsObj.gpsToggle = false;
      mainGpsObj.gpsName = "gpsOff";
    } else {
      mainGpsObj.gpsImg = "./svg/icons/button/gps_on.svg";
      mainGpsObj.gpsToggle = true;
      mainGpsObj.gpsName = "gpsOn";
      // if (stantion) {
      //   findRegion(stantion.region, stantion.code);
      // }
    }

    const gpsRaw = JSON.stringify(mainGpsObj);
    localStorage.setItem("gps", gpsRaw);
    toggleMainMap(mainGpsObj);
  };

  const handleMouseEnter = (e) => {
    const x = e.pageX;
    const y = e.pageY;

    const text = "Включение GPS";

    showToolTip(text, x, y, "down");
  };

  const handleMouseLeave = () => {
    hiddenTootTip();
  };

  return (
    <div className={classes.ToggleGpsButton}>
      <img
        src={gpsImg}
        alt={gpsName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleToggleButton}
      />
    </div>
  );
};

const mapDispathToProps = (dispatch) => {
  return {
    toggleMainMap: (store) => dispatch(toggleMainMap(store)),
  };
};

const mapStateToProps = (state) => {
  return {
    gpsName: state.tablo.gpsName,
    gpsImg: state.tablo.gpsImg,
    gpsToggle: state.tablo.gpsToggle,
    stantion: state.gps.stantion,
  };
};

export default connect(mapStateToProps, mapDispathToProps)(ToggleGpsButton);
