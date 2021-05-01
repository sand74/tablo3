import React from "react";
import classes from "./ClearButton.module.css";

const ClearButton = (props) => {
  return (
    <div className={classes.clearButton}>
      <div className={classes.btn} onClick={props.onClick}>
        Очистить
      </div>
    </div>
  );
};

export default ClearButton;
