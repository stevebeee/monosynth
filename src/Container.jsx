import React from "react";
import styled from "@emotion/styled";
import Oscillator from "./Oscillator";
import Envelope from "./Envelope";
import Keyboard from "./Keyboard";
import ThemeContext from "./ThemeContext";
import mq from './breakpoints';

const Synth = styled.div(props => mq({
    display: ['none','block'],
    textAlign: 'center',
    backgroundColor: props.theme === 'light' ? 'white' : 'black' 
}));

const Container = props => {
    const context = ThemeContext;
    return (
        <Synth theme={context._currentValue}>
            <Oscillator osc={props.synth.oscillator} />
            <Envelope env={props.synth.envelope} />
            <Keyboard synth={props.synth} />
        </Synth>
    )
}

export default Container;