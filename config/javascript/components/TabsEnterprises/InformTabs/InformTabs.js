import React from "react";
import "./InformTabs.css";

import Table from "react-bootstrap/Table";
import { Dimensions } from "react-native";
import parse from "html-react-parser";

const handleClickLink = (link) => {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const winTop = 0;
  const winLeft = screenWidth / 2;
  const height = screenHeight - 100;
  const width = screenWidth / 2 - 50;

  window.open(
    link,
    "myWindow",
    "width=" +
      width +
      ", height=" +
      height +
      ", left=" +
      winLeft +
      ", top=" +
      winTop +
      ", scrollbars=yes, resizable=yes"
  );
};

const handleClickLinkNoWindow = (link) => {
  //console.log("href:", link);
  if (link) {
    window.open(link);
    //console.log(link);
    //const path = window.location.href;
    //console.log(path);
    //const url = new URL(link, path);
    //url.searchParams.set("name", fname);
    //console.log(url.href);

    //window.open(url.href);
  }
};

const renderDefault = (item, index) => {
  let str = item.value;

  if (item.style) {
    str = item.style === "bold" ? `<b>${str}</b>` : str;
  }

  const text = str.split("\n");

  return (
    <tr key={index.toString()}>
      <td>{item.name}</td>
      <td>
        {text.map((i, index) => (
          <p key={index.toString()}>
            <span style={{ paddingLeft: "1em" }}></span>
            {parse(i)}
          </p>
        ))}
      </td>
    </tr>
  );
};

const InformTabs = (props) => {
  // код станции;
  // наименование станции;
  // наименование предприятия;
  // полное наименование предприятия;
  // телефон;
  // характеристики

  const data = props.items;

  //console.log(data);

  if (data === undefined) {
    return null;
  }

  const renderRowItems = () =>
    data.map((item, index) => {
      if (item.type) {
        switch (item.type) {
          case "link":
            return (
              <tr key={index.toString()}>
                <td>{item.name}</td>
                <td>
                  <span
                    className="vlink"
                    onClick={
                      item.nowindow
                        ? () => handleClickLinkNoWindow(item.value)
                        : () => handleClickLink(item.value)
                    }
                  >
                    {item.link_name ? item.link_name : "Выписка из ТРА"}
                  </span>
                </td>
              </tr>
            );
          default:
            return renderDefault(item, index);
        }
      } else {
        return renderDefault(item, index);
      }
    });

  return (
    <div className="scroll-table">
      <Table striped bordered hover size="sm">
        <tbody>{renderRowItems()}</tbody>
      </Table>
    </div>
  );
};

export default InformTabs;
