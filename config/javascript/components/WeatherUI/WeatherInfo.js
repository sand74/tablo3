import React from "react";
import classes from "./WeatherUI.module.css";

const WeatherInfo = (props) => {
  return (
    <dl>
      <dt className={classes.textRed}>{props.selectItem.stan_day_time}</dt>
      <dd className={classes.textText}>
        <b> {props.selectItem.kol_cloud}</b>
      </dd>
      <dd className={classes.textText}>
        <b>Ветер: </b>
        {props.selectItem.wind}
      </dd>
      {props.selectItem.wind_speed !== null ? (
        <dd className={classes.textText}>
          <b>Cкорость : </b>
          {props.selectItem.wind_speed} м/с
        </dd>
      ) : null}
      {props.selectItem.temperature !== null ? (
        <dd className={classes.textText}>
          <b>Температура :</b> {props.selectItem.temperature} С
        </dd>
      ) : null}
      {props.selectItem.pressure !== null ? (
        <dd className={classes.textText}>
          <b>Давление :</b> {props.selectItem.pressure} мб
        </dd>
      ) : null}
      {props.selectItem.visibility !== null ? (
        <dd className={classes.textText}>
          <b>Видимость : </b>
          {props.selectItem.visibility} км
        </dd>
      ) : null}
      {props.selectItem.phenomena !== null ? (
        <dd className={classes.textText}>
          <b>Явления в срок :</b> {props.selectItem.phenomena}
        </dd>
      ) : null}

      {props.selectItem.nabludenie_1 !== null ? (
        <dd className={classes.textText}>
          <b>Явления между сроками 1 :</b> {props.selectItem.nabludenie_1}
        </dd>
      ) : null}
      {props.selectItem.nabludenie_2 !== null ? (
        <dd className={classes.textText}>
          <b>Явления между сроками 2 :</b> {props.selectItem.nabludenie_2}
        </dd>
      ) : null}
      {props.selectItem.dangerous_phenomena !== null ? (
        <dd className={classes.textText}>
          <b style={{ color: "red" }}> OЯП: </b>
          {props.selectItem.dangerous_phenomena}
        </dd>
      ) : null}
      {props.selectItem.gust_of_wind !== null ? (
        <dd className={classes.textText}>
          <b>Порывы ветра в срок : </b>
          {props.selectItem.gust_of_wind} м/с
        </dd>
      ) : null}
      {props.selectItem.gust_of_wind_between !== null ? (
        <dd className={classes.textText}>
          <b>Порывы между сроками : </b>
          {props.selectItem.gust_of_wind_between} м/с
        </dd>
      ) : null}
      {props.selectItem.col_1 !== null ? (
        <dd className={classes.textText}>
          <b>Высота снега по рейке :</b> {props.selectItem.col_1}
        </dd>
      ) : null}
      {props.selectItem.col_2 !== null ? (
        <dd className={classes.textText}>
          <b>Сумма осадков за 12 ч :</b> {props.selectItem.col_2}
        </dd>
      ) : null}
    </dl>
  );
};

export default WeatherInfo;
