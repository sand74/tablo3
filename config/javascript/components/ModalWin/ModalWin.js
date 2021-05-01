import React, { useState } from "react";
import Draggable from "react-draggable";
import { MdCancel } from "react-icons/md";
import { connect } from "react-redux";
import { ModalIsOpen } from "../../store/actions/modalAction";
import "./ModalWin.css";

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.isModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isModalClose: () => dispatch(ModalIsOpen(false)),
  };
};

const ModalWin = (props) => {
  const [cursor, setCursor] = useState("default");

  const handleStart = () => {
    setCursor("move");
  };

  const handleStop = () => {
    setCursor("default");
  };

  return (
    <div
      className="ModalBackgraund"
      style={{ visibility: props.isOpen ? "visible" : "hidden" }}
    >
      <Draggable handle=".ModalHead" onStart={handleStart} onStop={handleStop}>
        <div className="ModalWin" style={{ cursor: cursor }}>
          <div className="ModalHead">
            {props.title}
            <div className="ModalBtnClose" onClick={() => props.isModalClose()}>
              <MdCancel />
            </div>
          </div>
          <div>{props.children}</div>
        </div>
      </Draggable>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWin);
