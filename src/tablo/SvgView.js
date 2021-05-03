import React, {forwardRef, useContext, useEffect, useImperativeHandle, useState} from 'react';
import {withFauxDOM} from 'react-faux-dom'
import * as d3 from "d3";
import PropTypes from 'prop-types';

const SvgView = (props) => {
    // console.log('SvgView name', props.name);

    // const [name, setName] = useState();
    //
    // useEffect(() => {
    //    setName(props.name);
    // }, []);

    return (
        <svg id={props.name} {...props.style}/>
    )
};

const FauxMap = withFauxDOM(SvgView)

export default FauxMap
