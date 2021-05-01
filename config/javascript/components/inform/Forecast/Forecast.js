import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { parsePeriodToString2 } from "../../../utils/common";
import classes from "./Forecast.module.css";
import ForecastTitle from "./ForecastTitle";

const dayIcon = "./svg/icons/forecast/day.svg";
const nightIcon = "./svg/icons/forecast/night.svg";

const parseDate = (dateString) => {
  const arr = dateString.trim().split("-");
  return `${arr[2]}-${arr[1]}-${arr[0]}`;
};

const initForecast = {
  url: dayIcon,
  period: "",
  text: "",
  name: "day",
};

const Forecast = ({ isOpen, items }) => {
  const [forecastShow, setForecastShow] = useState("hidden");
  const [forecastItem, setForecastItem] = useState(initForecast);

  useEffect(() => {
    if (items.length > 0) {
      setForecastItem({
        url: dayIcon,
        period: parsePeriodToString2(items[0].day.period),
        text: items[0].day.prognoz,
        name: "day",
      });
    }
    // eslint-disable-next-line
  }, [items]);

  useEffect(() => {
    if (isOpen) {
      if (items.length > 0) {
        setForecastShow("visible");
      } else {
        setForecastShow("hidden");
      }
    } else {
      setForecastShow("hidden");
    }
  }, [isOpen, items.length]);

  const handleClick = () => {
    if (forecastItem.name === "day") {
      setForecastItem({
        url: nightIcon,
        period: parsePeriodToString2(items[0].night.period),
        text: items[0].night.prognoz,
        name: "night",
      });
    } else {
      setForecastItem({
        url: dayIcon,
        period: parsePeriodToString2(items[0].day.period),
        text: items[0].day.prognoz,
        name: "day",
      });
    }
  };

  if (items.length > 0) {
    const dateStr = parseDate(items[0].date);
    const date = new Date(dateStr);
    const textFormat = forecastItem.text.split(";").join(". ");
    return (
      <div className={classes.Forecast} style={{ visibility: forecastShow }}>
        <div className={classes.Header}>
          Прогноз погоды на {date.toLocaleDateString()}
        </div>
        <div className={classes.Body}>
          <ForecastTitle
            period={forecastItem.period}
            img={forecastItem.url}
            name={forecastItem.name}
            handleClick={handleClick}
          />
          <div className={classes.Text}>
            <p>{textFormat}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={classes.Forecast}
        style={{ visibility: forecastShow }}
      ></div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    items: state.forecast.items,
    hasErrored: state.forecast.error,
    isLoading: state.forecast.loading,
    isOpen: state.forecast.isOpen,
  };
};

export default connect(mapStateToProps, null)(Forecast);
