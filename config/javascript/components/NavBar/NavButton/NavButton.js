import React from "react";
import { Dimensions } from "react-native";
import classes from "./NavButton.module.css";

/**
 *  функция открытия окна для
 */

const NavButton = (props) => {
  let style_button = classes["link"] + " " + classes[props.styleButton];

  const disabled = props.disabled;

  const handleClick = () => {
    const screenWidth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;
    const winTop = 0;
    const winLeft = screenWidth / 2;
    const height = screenHeight - 100;
    const width = screenWidth / 2 - 50;

    window.open(
      props.path,
      "myWindow",
      "width=" +
        width +
        ", height=" +
        height +
        ", left=" +
        winLeft +
        ", top=" +
        winTop +
        ", scrollbars=yes, resizable=yes"
    );
  };

  if (disabled === "true") {
    return <div className={classes.disabled}>{props.name}</div>;
  } else {
    return (
      <div className={style_button} onClick={handleClick}>
        {props.name}
      </div>
    );
  }
};

export default NavButton;
