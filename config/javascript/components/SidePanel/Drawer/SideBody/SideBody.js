import React, { useEffect } from "react";
import classes from "./SideBody.module.css";
//import CheckBlock from "./CheckBlock/CheckBlock";
import { layersGroupInit } from "../../../../config/layerGroupInit";
import { connect } from "react-redux";
import {
  postShowLayer,
  postFindCode,
} from "../../../../store/actions/layerAction";
import AccordionBody from "./Accordion/AccordionBody";
import StationSearch from "./StationSearch/StationSearch";
import ClearButton from "./ClearButton/ClearButton";

const SideBody = ({ ShowLayers, postShowLayer, postFindStantion }) => {
  useEffect(() => {
    postShowLayer(layersGroupInit);

    return undefined;
  }, [postShowLayer]);

  const handlerClear = () => {
    const layers = ShowLayers.map((block) => {
      return {
        ...block,
        data: block.data.map((item) => ({ ...item, show: false })),
      };
    });
    postFindStantion("0");
    postShowLayer(layers);
  };

  return (
    <div className={classes.SideBody}>
      <StationSearch />
      <AccordionBody postShowLayer={postShowLayer} ShowLayers={ShowLayers} />
      <ClearButton onClick={handlerClear} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ShowLayers: state.layer.layers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postShowLayer: (layers) => dispatch(postShowLayer(layers)),
    postFindStantion: (code) => dispatch(postFindCode(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBody);
