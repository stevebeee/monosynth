import React from "react";
import "./slider.css";

const ThemeToggleButton = props => {
    return (
        <label className="switch" onMouseUp={props.toggleTheme}>
            <input type="checkbox" className="toggle"/>
            <span className="slider"></span>
        </label>
    )
}

export default ThemeToggleButton;