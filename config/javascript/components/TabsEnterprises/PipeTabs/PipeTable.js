import React from "react";
import DataTable from "react-data-table-component";
import { customStyles as defaultStyles } from "./PipeStyles";

const PipeTable = ({ items, customStyles = defaultStyles }) => {
  if (items === undefined) {
    return <div></div>;
  } else if (Object.keys(items).length === 0) {
    return <div></div>;
  } else {
    const columns = [];

    for (const [key, value] of Object.entries(items.title)) {
      let col;
      if (typeof value === "object") {
        let rb = false;
        let cb = true;

        if (value.align) {
          rb = value.align === "right";
          cb = value.align === "center";
        }

        col = {
          selector: key,
          name: value.name,
          wrap: true,
          width: value.width,
          right: rb,
          center: cb,
        };
      } else {
        col = {
          selector: key,
          name: value,
          wrap: true,
          right: false,
          center: true,
        };
      }

      col.minWidth = "10em";

      columns.push(col);
    }

    const data = items.data;

    return (
      <DataTable
        title="Arnold Movies"
        columns={columns}
        data={data}
        fixedHeader
        fixedHeaderScrollHeight="22em"
        noHeader={true}
        customStyles={customStyles}
        striped={true}
        noDataComponent="Нет данных"
      />
    );
  }
};

export default PipeTable;
