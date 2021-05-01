import React from "react";
// eslint-disable-next-line
import { isHttps } from "../../../utils/gpsUtils";

import ToggleGpsButton from "./ToggleGpsButton/ToggleGpsButton";
import ToggleMapButton from "./ToggleMapButton/ToggleMapButton";
import classes from "./ToolsButtons.module.css";

const ToolsButtons = () => {
  const gpsIsSupport = isHttps();

  return (
    <div className={classes.ToolsButtons}>
      <ToggleMapButton />
      {gpsIsSupport ? <ToggleGpsButton /> : null}
    </div>
  );
};

export default ToolsButtons;
