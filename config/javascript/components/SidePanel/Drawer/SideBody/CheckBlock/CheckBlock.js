import React from "react";
import Checkbox from "rc-checkbox";
import classes from "./CheckBlock.module.css";

const CheckBlock = ({ blockCheck, onChange }) => {
  return (
    <div className={classes.CheckBlock}>
      <ul className="ulapp">
        {blockCheck.map((item, index) => {
          return (
            <li key={index} style={{ visibility: item.visible }}>
              <label>
                <Checkbox
                  checked={item.show}
                  onChange={onChange}
                  name={item.layer}
                  index={index}
                  disabled={item.disabled} //{!props.SpecKey}
                />

                <span style={{ paddingLeft: "0.5rem" }}></span>
                {item.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CheckBlock;
