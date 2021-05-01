import React from "react";
import classes from "./WeatherUI.module.css";
import { connect } from "react-redux";
import { SizeMe } from "react-sizeme";
import WeatherInfo from "./WeatherInfo";

import { weatherWinClose } from "../../store/actions/weatherAction";

const mapStateToProps = (state) => {
  return {
    isOpen: state.weather.isOpen,
    x: state.weather.x,
    y: state.weather.y,
    selectItem: state.weather.selectItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    weatherWinClose: () => dispatch(weatherWinClose()),
  };
};

const WeatherUI = (props) => {
  return (
    <SizeMe monitorHeight="true">{({ size }) => renderUI(size, props)}</SizeMe>
  );
};

const renderUI = (size, props) => {
  // console.log("props:", props);
  // console.log("size:", size);
  if (props.isOpen) {
    const { width, height } = size;
    const dX = width + 5;
    const dY = height + 5;

    const coorX = props.x - dX;
    let coorY = props.y - dY;
    if (coorY < 0) {
      coorY = props.y + 5;
    }

    return (
      <div
        className={classes.Weather}
        style={{
          visibility: props.isOpen ? "visible" : "hidden",
          top: coorY,
          left: coorX,
        }}
      >
        <WeatherInfo selectItem={props.selectItem} />
      </div>
    );
  } else {
    return null;
    //return <div className={classes.Weather} />;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherUI);
