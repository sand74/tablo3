import React, {useEffect, useState} from "react";
import "./MapConteiner.css";

import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import Board from "./Board";
import sizeMe from "react-sizeme";
import {useDispatch, useSelector} from "react-redux";
import {findRegion} from "./tablo";
import {startLocation, stopLocation} from "../../utils/gpsUtils";
import {fetchGPS, resetGPS} from "../../store/actions/gpsAction";

const icons = {
    zoomIn: "./svg/icons/button/zoom.svg",
    zoomOut: "./svg/icons/button/out.svg",
    zoomReset: "./svg/icons/button/restore.svg",
    zoomGPS: "./svg/icons/button/gps.svg",
};

const MapConteiner = (props) => {
    const {gpsToggle} = useSelector((state) => state.tablo);
    const {stantion} = useSelector((state) => state.gps);
    const [uid, setUid] = useState(0);
    const dispatch = useDispatch();
    //console.log("selector:", stantion);

    useEffect(() => {
        if (gpsToggle) {
            //console.log("start location");
            setUid(
                startLocation((long, lat) => {
                    //console.log(`long: ${long} lat: ${lat}`);
                    dispatch(fetchGPS(long, lat));
                })
            );
        } else {
            //console.log("stop location", uid);
            if (uid) {
                stopLocation(uid);
                dispatch(resetGPS());
                setUid(0);
            }
        }
        // eslint-disable-next-line
    }, [gpsToggle, dispatch]);

    const styleButtonZoom = {
        width: "20px",
        height: "20px",
    };

    const {width, height} = props.size;

    let w = width - 10;
    let h = height - 10;

    const handlerGPS = () => {
        if (stantion) {
            findRegion(stantion.region);
        }
    };

    return (
        <TransformWrapper defaultScale={1}>
            {({zoomIn, zoomOut, resetTransform, ...rect}) => (
                <div>
                    <div className="tools">
                        <div className="tools-button" onClick={zoomIn}>
                            <img src={icons.zoomIn} alt="+" style={styleButtonZoom}/>
                        </div>
                        <div className="tools-button" onClick={zoomOut}>
                            <img src={icons.zoomOut} alt="-" style={styleButtonZoom}/>
                        </div>
                        <div className="tools-button" onClick={resetTransform}>
                            <img src={icons.zoomReset} alt="x" style={styleButtonZoom}/>
                        </div>
                        {gpsToggle ? (
                            <div className="tools-button" onClick={handlerGPS}>
                                <img src={icons.zoomGPS} alt="gps" style={styleButtonZoom}/>
                            </div>
                        ) : null}
                    </div>
                    <TransformComponent>
                        <Board Width={w} Height={h} resetZoom={resetTransform}/>
                    </TransformComponent>
                </div>
            )}
        </TransformWrapper>
    );
};

export default sizeMe({monitorHeight: true, monitorWidth: true})(
    MapConteiner
);
