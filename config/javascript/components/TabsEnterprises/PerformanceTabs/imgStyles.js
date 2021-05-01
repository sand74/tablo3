//import React from 'react'
import { defaultThemes } from "react-data-table-component";

export const imgStyles = {
  header: {
    style: {
      minHeight: "56px",
    },
  },
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: defaultThemes.default.divider.default,
    },
  },
  headCells: {
    style: {
      fontSize: "1em",
      fontWeight: "bold",
      padding: "0.5em",
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
  rows: {
    style: {
      monitorHeight: "500px",
      minHeight: "180px",
      "&:hover": {
        background: "rgb(188, 215, 233)",
      },
    },
  },
  cells: {
    style: {
      padding: 0, //"1em",
      fontSize: "1em",
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
};
