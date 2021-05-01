import React from "react";
import classes from "./Search.module.css";

const SearchList = ({ searchList = [], onClick }) => {
  return (
    <div className={classes.searchList}>
      {searchList.map((data, index) => {
        if (data) {
          return (
            <div key={index}>
              <div
                className={classes.searchItem}
                onClick={() => onClick(data.name)}
              >
                {data.name}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default SearchList;
