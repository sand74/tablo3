
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {withFauxDOM} from 'react-faux-dom'
import * as d3 from "d3";
import PropTypes from 'prop-types';

const SvgView = (props) => {
    const [svg, setSvg] = useState();

    useEffect(() => {
        d3.xml(props.url).then((xml) => {
            let box = document.querySelector('#' + props.name);
            let doc =  xml.documentElement;
            doc.setAttribute("preserveAspectRatio", "xMidYMin");
            doc.setAttribute("height", "100%");
            doc.setAttribute("width", "100%");
            let svg = d3.select(doc);
            // Sve svg to state
            setSvg(svg);
            // Click on region buttons
            svg.select('#buttons').selectAll('g')
                .on('click', (event) => { props.onSvgClick({ type: 'region', event: event}) })
                .on('mouseenter', (event) => { props.onSvgClick({ type: 'region', event: event}) })
                .on('mouseleave', (event) => { props.onSvgClick({ type: 'region', event: event}) });
            svg.selectAll('#terms > *').on('click', (event) => { props.onSvgClick({ type: 'picket', event: event}) });
            svg.selectAll('g[id^="port"]').on('click', (event) => { props.onSvgClick({ type: 'port', event: event}) });
            svg.select("#go_region").selectAll("*").on('click', (event) => { props.onSvgClick({ type: 'go-region', event: event}) });

            box.appendChild(svg.node());
        });
    }, [props.url, props.name]);

    return (
        <svg id={props.name} {...props.style} />
    )
}

SvgView.defaultProps = {
    name: undefined,
    url: undefined,
    onSvgClick: (event) => {}
}

SvgView.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    onSvgClick: PropTypes.func.isRequired
}

const FauxMap = withFauxDOM(SvgView)

export default FauxMap
