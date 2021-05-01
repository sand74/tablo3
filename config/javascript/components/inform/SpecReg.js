import React from "react";
import { connect } from "react-redux";

const SpecReg = (props) => {
  
  if (props.SpecKey) {
    return (
      <div className={props.className}>
        <img src={props.SpecKey} alt="specifecation" width="100%" />
      </div>
    );
  } else {
    return <div className={props.className}></div>;
  }
};

const mapStateToProps = (state) => {
  return {
    SpecKey: state.inform.spec,
  };
};

export default connect(mapStateToProps, null)(SpecReg);
