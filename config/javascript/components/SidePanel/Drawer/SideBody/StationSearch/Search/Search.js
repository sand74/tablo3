import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import { findRegion } from "../../../../../map/tablo";
import SearchList from "./SearchList";
import classes from "./Search.module.css";
import { postFindCode } from "../../../../../../store/actions/layerAction";

const Search = ({ loading, stantions, resetZoom, postFindStantion }) => {
  const [input, setInput] = useState("");
  const [stantionsListDefault, setStantionsListDefault] = useState();
  const [stantionsList, setStantionsList] = useState();

  const inputRef = useRef(null);
  //const listRef = useRef(null);

  const replaceInputValue = (value, postfix) => {
    const keys = ["ДС", "ДС(ПКО)"];
    if (keys.find((item) => value === item)) {
      return `${value} ${postfix}`;
    } else {
      return value;
    }
  };

  const getStantionList = () => {
    if (stantions) {
      const result = [];
      for (let item in stantions) {
        const stn = stantions[item];
        result.push({
          name: stn.ms,
          code: item,
          region: stn.region,
        });
        stn.nodes.forEach((element) => {
          result.push({
            name: replaceInputValue(element.name, stn.ms),
            code: item,
            region: stn.region,
          });
        });
      }
      return result;
    } else {
      return null;
    }
  };

  const updateInput = (input) => {
    if (input === "") {
      setInput("");
      setStantionsList([]);
    } else {
      const filtered = stantionsListDefault.filter((item) => {
        return item.name.toLowerCase().includes(input.toLowerCase());
      });
      setInput(input);
      setStantionsList(filtered);
    }
  };

  useEffect(() => {
    if (!loading) {
      setStantionsListDefault(() => getStantionList());
    }
    // eslint-disable-next-line
  }, [loading]);

  const listClick = (value) => {
    setInput(value);
    setStantionsList([]);
    inputRef.current.focus();
  };

  const handlerSearchClick = () => {
    setInput("");
    setStantionsList([]);
    const stn = stantionsListDefault.find(
      (item) => item.name.toLowerCase() === input.toLowerCase()
    );

    if (stn) {
      postFindStantion(stn.code);
      findRegion(stn.region);
      if (resetZoom) {
        resetZoom();
      }
    }
  };

  const handlerEnter = (key) => {
    if (key === "Enter") {
      handlerSearchClick();
    }
  };

  return (
    <div className={classes.Search}>
      <SearchBar
        inputRef={inputRef}
        input={input}
        onChange={updateInput}
        onClick={handlerSearchClick}
        onKeyPress={handlerEnter}
      />
      <SearchList searchList={stantionsList} onClick={listClick} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.tablo.loading,
    stantions: state.tablo.items,
    resetZoom: state.layer.resetZoom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postFindStantion: (code) => dispatch(postFindCode(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
