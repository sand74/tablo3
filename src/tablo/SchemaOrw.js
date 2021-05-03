import React, {useEffect, useState} from 'react';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {makeStyles} from "@material-ui/core/styles";
import {ZoomIn, ZoomOut, ZoomOutMap} from '@material-ui/icons';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {getSchema} from './Schemas';
import SvgView from "./SvgView";
import * as d3 from "d3";

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

    const [schemaDesc, setSchemaDesc] = useState(() => {
        return getSchema('orw');
    });

    const [schemaSvg, setSchemaSvg] = useState();
    const [legendSvg, setLegendSvg] = useState();
    const [tableSvg, setTableSvg] = useState();

    useEffect(() => {
        if(!schemaDesc.schema) {
            let box = document.querySelector('#schema');
            if(box && schemaSvg) {
                box.removeChild(schemaSvg);
            }
            setSchemaSvg(undefined);
            return;
        }
        d3.xml(schemaDesc.schema).then((xml) => {
            let box = document.querySelector('#schema');
            if (box) {
                if (schemaSvg) {
                    box.removeChild(schemaSvg);
                }

                let doc = xml.documentElement;
                doc.setAttribute("preserveAspectRatio", "xMidYMin");
                doc.setAttribute("height", "100%");
                doc.setAttribute("width", "100%");
                let svg = d3.select(doc);

                svg.select("#buttons").selectAll("g").on('click', function (event) {
                    handleClickRegion(event, d3.select(this));
                });
                svg.select("#buttons").selectAll("g").on("mouseenter", function (event) {
                    d3.select(this).selectAll("rect").attr("fill-opacity", "1");
                });
                svg.select("#buttons").selectAll("g").on("mouseleave", function (event) {
                    d3.select(this).selectAll("rect").attr("fill-opacity", "0.35");
                });

                svg.select("#close_button").on("click", function(event) {
                    handleCloseButton(event, d3.select(this));
                });
                svg.select("#close_button").on("mouseenter", function(event) {
                    d3.select(this).attr("opacity", "0.98");
                });
                svg.select("#close_button").on("mouseleave", function(event) {
                    d3.select(this).attr("opacity", "0.595982143");
                });

                svg.selectAll("#go_region").selectAll("*").on('click', function (event) {
                    handleClickRegion(event, d3.select(this));
                });

                box.appendChild(svg.node());
                setSchemaSvg(svg.node());
            }
        });
    }, [schemaDesc.schema]);

    useEffect(() => {
        if(!schemaDesc.legend) {
            let box = document.querySelector('#schema_legend');
            if(box && legendSvg) {
                box.removeChild(legendSvg);
            }
            setLegendSvg(undefined);
            return;
        }
        d3.xml(schemaDesc.legend).then((xml) => {
            let box = document.querySelector('#schema_legend');
            if(box) {
                if (legendSvg) {
                    box.removeChild(legendSvg);
                }

                let doc = xml.documentElement;
                doc.setAttribute("preserveAspectRatio", "xMidYMin");
                doc.setAttribute("height", "100%");
                doc.setAttribute("width", "100%");
                let svg = d3.select(doc);
                box.appendChild(svg.node());

                setLegendSvg(svg.node())
            }
        });
    }, [schemaDesc.legend]);

    useEffect(() => {
        if(!schemaDesc.table) {
            let box = document.querySelector('#schema_table');
            if(box && tableSvg) {
                box.removeChild(tableSvg);
            }
            setTableSvg(undefined);
            return;
        }
        d3.xml(schemaDesc.table).then((xml) => {
            let box = document.querySelector('#schema_table');
            if(box) {
                if (tableSvg) {
                    box.removeChild(tableSvg);
                }

                let doc = xml.documentElement;
                doc.setAttribute("preserveAspectRatio", "xMidYMin");
                doc.setAttribute("height", "100%");
                doc.setAttribute("width", "100%");
                let svg = d3.select(doc);
                box.appendChild(svg.node());

                setTableSvg(svg.node())
            }
        });
    }, [schemaDesc.legend]);

    const handleClickRegion = (event, selection) => {
        console.log('Region clicked', event, selection.attr('id'));
        const sd = getSchema(selection.attr('id'));
        setSchemaDesc(sd);
    }

    const handleCloseButton = (event, selection) => {
        console.log('Close clicked', event, selection.attr('id'));
        const sd = getSchema('orw');
        setSchemaDesc(sd);
    }

    const handleLoadComplete = (svg) => {
        svg.selectAll('#terms > *').on('click', handleClickPicket);
        svg.selectAll('g[id^="port"]').on('click', handleClickPort);
        svg.selectAll("#go_region").selectAll("*").on('click', handleClickGoRegion);
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
                                <SvgView name='schema' style={{width: '80vh', height: '80vh'}}/>
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
                        <SvgView name='schema_table' style={{width: '30vh', height: '20vh'}}/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <SvgView name='schema_legend' style={{width: '30vh', height: '20vh'}}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

SchemaOrw.defaultProps = {}

SchemaOrw.propTypes = {}

export default SchemaOrw