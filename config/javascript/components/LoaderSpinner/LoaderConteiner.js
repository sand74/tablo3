import React from "react";
import LoaderSpinner from "./LoaderSpinner";
import classes from "./LoaderSpinner.module.css";

const LoaderConteiner = () => {
  return (
    <div className={classes.LoaderBox}>
      <LoaderSpinner />
    </div>
  );
};

export default LoaderConteiner;
