import React from 'react';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {makeStyles} from "@material-ui/core/styles";
import {ZoomIn, ZoomOut, ZoomOutMap} from '@material-ui/icons';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SchemaOrwSvg from '/public/svg/tablo.svg';
import LegendSvg from '/public/svg/legend.svg';
import SvgView from "./components/SvgView";

const icons = {
    zoomIn: "./svg/icons/button/zoom.svg",
    zoomOut: "./svg/icons/button/out.svg",
    zoomReset: "./svg/icons/button/restore.svg",
    zoomGPS: "./svg/icons/button/gps.svg",
};


const useStyles = makeStyles(theme => ({
    svg: {
        width: '100%',
        height: '100%',
        cursor: 'default',
    },

    tools: {
        width: '125px',
        height: '30px',
        position: 'absolute',
        zIndex: '1',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'row',
        padding: '2px',
    },

    toolsButton: {
        width: '28px',
        height: '28px',
        border: '1px',
        solid: 'gray',
        borderRadius: '3px',
        background: 'rgba(217, 217, 217, 0.5)',
        marginLeft: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    stormIcon: {
        fillIcon: '#bc00ff',
    },

    stormIconHover: {
        fillIcon: '#f06bb8'
    },

    pointer: {
        color: 'rgb(170, 20, 20)'
    },

    gps: {
        color: 'rgb(50, 4, 216)'
    },

    zoomIcons: {
        fontSize: 50
    }
}));

const styleButtonZoom = {
    width: "20px",
    height: "20px",
};


const SchemaOrw = (props) => {
    const classes = useStyles();

    const HandleOnClick = (event) => {
        console.log('event', event.type);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <TransformWrapper defaultScale={1} {...props.style}>
                    {({zoomIn, zoomOut, resetTransform, ...rect}) => (
                        <div>
                            <div className={classes.tools}>
                                <ZoomIn className={classes.zoomIcons} onClick={zoomIn}/>
                                <ZoomOut className={classes.zoomIcons} onClick={zoomOut}/>
                                <ZoomOutMap className={classes.zoomIcons} onClick={resetTransform}/>
                            </div>
                            <TransformComponent {...props.style}>
                                <SvgView resetZoom={resetTransform}
                                         name={'schema_orw'} url={SchemaOrwSvg}
                                         style={{width: '80vh', height: '80vh'}}
                                         onSvgClick={ HandleOnClick }/>
                            </TransformComponent>
                        </div>
                    )}
                </TransformWrapper>
            </Grid>
            <Grid item md={4} lg={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <SvgView name={'legend_orw'} url={LegendSvg}
                                 style={{width: '30vh', height: '20vh'}}
                                 onSvgClick={ () => {console.log('Legend click') }}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

SchemaOrw.defaultProps = {}

SchemaOrw.propTypes = {}

export default SchemaOrw