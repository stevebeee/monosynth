import React from "react";
import styled from "@emotion/styled";
import ThemeContext from "./ThemeContext";
import mq from "./breakpoints";

const Message = styled.p(props => mq({
    display: ['block','none'],
    fontFamily: 'Arial',
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: props.theme === 'light' ? 'black' : 'white',
    backgroundColor: props.theme === 'light' ? 'white' : 'black',
}));

const ErrorMessage = () => {
    const context = ThemeContext;
    return (
        <Message theme={context._currentValue}>Please use a desktop browser with a minimum width of 1000 pixels</Message>
    )
}

export default ErrorMessage;