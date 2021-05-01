import React from "react";
import DataTable from "react-data-table-component";
import CustomCell from "./CustomCell/CustomCell";

const calcWidths = (size, lenDev, cols) => {
  const ret = cols.map((item, index) => {
    if (index === 0) {
      return 0;
    } else {
      if (!item.width) {
        return lenDev;
      } else {
        return parseInt(item.width);
      }
    }
  });

  const sumWidth = ret.reduce((sum, current) => sum + current);

  if (cols[0].width) {
    ret[0] = parseInt(cols[0].width);
  } else {
    ret[0] = size - 2 - sumWidth;
  }

  return ret;
};

const PerformanceTable = ({ items, rowsStyles }) => {
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

      //const rowsStyle = { ...customStyles.rows.style };
      //console.log(rowsStyle);

      if (key === "image") {
        //const prefix = "http://localhost:9080";
        const prefix = "";
        //customStyles.rows.style.minHeight = "180px";
        //console.log(customStyles);
        col.cell = (row) => (
          <img
            alt={row.name}
            src={`${prefix}${row.image}`}
            style={{ padding: "1em" }}
          />
        );
      } else {
        col.cell = (row, index, column) => (
          <CustomCell row={row} column={column} />
        );
      }

      columns.push(col);
    }

    const data = items.data;

    const columnsWidth = calcWidths(70, 8, columns);

    const all = columnsWidth.map((item, index) => {
      if (index === 0) {
        return {
          ...columns[index],
          width: `${item}rem`,
          right: false,
          center: false,
        };
      } else {
        if (index < columns.length - 1) {
          return {
            ...columns[index],
            ...{ width: `${item}rem` },
          };
        } else {
          return {
            ...columns[index],
            // selector: columns[index].selector,
            // name: columns[index].name,
            // wrap: columns[index].wrap,
            // right: columns[index].right,
            // center: columns[index].center,
          };
        }
      }
    });

    return (
      <DataTable
        title="Arnold Movies"
        columns={all}
        data={data}
        fixedHeader
        fixedHeaderScrollHeight="22em"
        noHeader={true}
        customStyles={rowsStyles}
        striped={true}
        noDataComponent="Нет данных"
      />
    );
  }
};

export default PerformanceTable;
