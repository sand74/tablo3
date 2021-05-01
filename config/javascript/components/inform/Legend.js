import React from "react";
import { connect } from "react-redux";

const Legend = (props) => {
  if (props.legendKey) {
    return (
      <div className={props.className}>
        <img src={props.legendKey} alt="legend" width="100%" />
      </div>
    );
  } else {
    return <div className={props.className}></div>;
  }
};

const mapStateToProps = (state) => {
  return {
    legendKey: state.inform.legend,
  };
};

export default connect(mapStateToProps, null)(Legend);
