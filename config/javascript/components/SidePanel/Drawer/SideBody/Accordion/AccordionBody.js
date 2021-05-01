import React from "react";
import classes from "./Accordion.module.css";
import Accordion from "./Accordion";
import CheckBlock from "../CheckBlock/CheckBlock";

const AccordionBody = ({ postShowLayer, ShowLayers }) => {
  function onChange(e) {
    let name = e.target.name;

    const layers = ShowLayers.map((block) => {
      return {
        ...block,
        data: block.data.map((item) => {
          if (item.layer === name) {
            return {
              ...item,
              show: e.target.checked,
            };
          } else {
            return item;
          }
        }),
      };
    });

    postShowLayer(layers);
  }

  return (
    <div className={classes.AccordionBody}>
      {ShowLayers.map((block) => {
        return (
          <Accordion key={block.groupIndex} title={block.title}>
            <CheckBlock blockCheck={block.data} onChange={onChange} />
          </Accordion>
        );
      })}
    </div>
  );
};

export default AccordionBody;
