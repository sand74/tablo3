import React from "react";
import classes from "./ListView.module.css";
import Table from "react-bootstrap/Table";

const ListView = ({ items }) => {
  const { data } = items;

  const listRender = data.map((row, index) => {
    const text = row.c_name.split("\n");
    return (
      <tr key={index.toString()}>
        <td>
          {text.map((i, index) => (
            <p key={index.toString()}>
              <span style={{ paddingLeft: "3em" }}></span>
              {i}
            </p>
          ))}
        </td>
      </tr>
    );
  });

  return (
    <div className={classes.ListView}>
      <div className={classes.header}>{items.title.c_name}</div>
      <div className={classes.scrollTable}>
        <Table striped bordered hover size="sm">
          <tbody>{listRender}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default ListView;
