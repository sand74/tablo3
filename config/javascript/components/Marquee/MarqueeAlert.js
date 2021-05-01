import React from "react";
import Marquee from "react-double-marquee";
import sizeMe from "react-sizeme";

const MarqueeAlert = (props) => {
  const mqwidth = props.size.width + "px";
  return (
    <div className="mq_conteiner">
      <div className={props.className} style={{ width: { mqwidth } }}>
        <Marquee direction={"left"}>
          Тестовая версия <span style={{ paddingLeft: "80px" }}></span>
          Тестовая версия<span style={{ paddingLeft: "80px" }}></span>
          Тестовая версия <span style={{ paddingLeft: "80px" }}></span>
          Тестовая версия<span style={{ paddingLeft: "80px" }}></span>
          Тестовая версия <span style={{ paddingLeft: "80px" }}></span>
          Тестовая версия<span style={{ paddingLeft: "80px" }}></span>
        </Marquee>
      </div>
    </div>
  );
};
export default sizeMe({ monitorHeight: true, monitorWidth: true })(
  MarqueeAlert
);
//export default MarqueeAlert;
