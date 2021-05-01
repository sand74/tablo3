import React from "react";
//import Backdrop from "../Backdrop/Backdrop";
import classes from "./Drawer.module.css";
import SideBody from "./SideBody/SideBody";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { IconContext } from "react-icons";

const Drawer = (props) => {
  const cls = [classes.Drawer];

  if (!props.isOpen) {
    cls.push(classes.close);
  }

  return (
    <div className={cls.join(" ")}>
      <div className={classes.bookmark} onClick={props.onToggleHandle}>
        <IconContext.Provider value={{ className: classes.icon }}>
          <div>{props.isOpen ? <FiChevronsRight /> : <FiChevronsLeft />}</div>
        </IconContext.Provider>
      </div>
      <div className={classes.slideBody}>
        <SideBody />
      </div>
    </div>
  );
};

export default Drawer;
