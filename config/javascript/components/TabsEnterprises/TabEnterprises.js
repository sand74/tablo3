import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import InformTabs from "./InformTabs/InformTabs";
import TableConteiner from "./PerformanceTabs/TableConteiner";
import { connect } from "react-redux";
import ModalWin from "../ModalWin/ModalWin";
import ListView from "./ListView/ListView";
import PipeTable from "./PipeTabs/PipeTable";
import LoaderConteiner from "../LoaderSpinner/LoaderConteiner";
import { customStyles as defaultStyles } from "./PerformanceTabs/CustomStyles";
import { imgStyles } from "./PerformanceTabs/imgStyles";

const mapStateToProps = (state) => {
  return {
    items: state.modal.items,
    viewer: state.modal.viewer,
    hasErrored: state.modal.error,
    isLoading: state.modal.loading,
  };
};

const TabEnterprises = (props) => {
  const keys = Object.keys(props.items);
  const activs = keys.filter((item) => item !== "info");

  const customTabs = activs.map((item, index) => {
    if (props.viewer === "list") {
      return (
        <Tab eventKey={item} title={props.items[item].header} key={index}>
          <ListView items={props.items[item]} />
        </Tab>
      );
    } else if (props.viewer === "pipe") {
      return (
        <Tab eventKey={item} title={props.items[item].header} key={index}>
          <PipeTable items={props.items[item]} />
        </Tab>
      );
    } else {
      return (
        <Tab eventKey={item} title={props.items[item].header} key={index}>
          <TableConteiner
            items={props.items[item]}
            rowsStyles={
              props.items[item].header === "Руководство"
                ? imgStyles
                : defaultStyles
            }
          />
        </Tab>
      );
    }
  });

  const contentRender = () => {
    if (props.hasErrored) {
      return <p>Ошибка загрузки данных: {props.hasErrored}</p>;
    }

    if (props.isLoading) {
      return (
        <div>
          <LoaderConteiner />
        </div>
      );
    } else {
      if (props.items.info) {
        return (
          <Tabs defaultActiveKey="info" id="uncontrolled-tab-example">
            <Tab eventKey="info" title="Информация">
              <InformTabs items={props.items.info} />
            </Tab>
            {customTabs}
          </Tabs>
        );
      } else {
        return <Tabs id="uncontrolled-tab-example">{customTabs}</Tabs>;
      }
    }
  };

  return <ModalWin>{contentRender()}</ModalWin>;
};

export default connect(mapStateToProps, null)(TabEnterprises);
