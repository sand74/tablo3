import React from "react";
import classes from "./CustomCell.module.css";

const CustomCell = ({ row, column }) => {
  let aling = column.center ? "center" : "left";
  aling = column.right ? "right" : aling;

  let value, color;
  const cellItem = row[column.selector];

  if (typeof cellItem === "object" && cellItem) {
    value = cellItem.value;
    color = cellItem.style;
  } else {
    value = cellItem;
    color = "wait";
  }

  return (
    <div
      className={classes.CustomCell}
      style={{ background: color, textAlign: aling }}
    >
      <p>{value}</p>
    </div>
  );
};

export default CustomCell;
