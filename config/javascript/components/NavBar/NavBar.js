import React, { useEffect } from "react";
import { connect } from "react-redux";

import NavButton from "./NavButton/NavButton";
import classes from "./NavBar.module.css";
import { navbarFetchData } from "../../store/actions/navbarActions";

// Замена наименования стиля с "bg-blue" на "bgBlue"
const translate = (name) => {
  const str = name.match(/-(\D)/);
  return name.replace(/-\D/, str[1].toUpperCase());
};

const mapStateToProps = (state) => {
  return {
    items: state.navbar.items,
    hasErrored: state.navbar.error,
    isLoading: state.navbar.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(navbarFetchData()),
  };
};

const NavBar = ({ fetchData, isLoading, items, hasErrored, className }) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (hasErrored) {
    console.log("Error:", hasErrored);
    return <div>Error</div>;
  }

  if (isLoading && items.length !== 0) {
    return <div>LOADING</div>;
  } else {
    const leftBox = items;

    leftBox.sort((a, b) => a.order_num - b.order_num);

    return (
      <div className={className + " " + classes.NavBar}>
        {leftBox.map((item, index) => {
          return (
            <NavButton
              key={index}
              styleButton={translate(item.style)}
              path={item.path}
              name={item.name}
              disabled={item.disabled}
            />
          );
        })}
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
