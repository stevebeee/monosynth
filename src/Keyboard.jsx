import React from "react";
import KEYBOARD from "./keyboardKeys";

const keyWidth = 20;
const keyBorderWidth = 1;
const keyMarginLeftRight = 5;
const keyMarginTopBottom = 60;

const containerStyles = {
  width:
    KEYBOARD.length * (keyWidth + 2 * keyBorderWidth + 2 * keyMarginLeftRight) +
    "px",
  margin: "100px auto 0px auto"
};

const keyStyles = {
  display: "inline-block",
  border: keyBorderWidth + "px solid #000",
  height: "60px",
  width: keyWidth + "px"
};

const sharpKeyStyles = {
  backgroundColor: "#000",
  margin:
    "0px " +
    keyMarginLeftRight +
    "px " +
    keyMarginTopBottom +
    "px " +
    keyMarginLeftRight +
    "px"
};

const naturalKeyStyles = {
  backgroundColor: "#FFF",
  margin:
    keyMarginTopBottom +
    "px " +
    keyMarginLeftRight +
    "px 0px " +
    keyMarginLeftRight +
    "px"
};

const initialState = {
  currentNote: ""
};

const reducer = (state, action = {}) => {
  switch (action.type) {
    case "down":
      if (state && state.currentNote && state.currentNote !== action.pitch) {
        action.synth.triggerRelease();
      }
      action.synth.triggerAttack(action.pitch);
      state.currentNote = action.pitch;
      break;
    case "up":
      action.synth.triggerRelease();
      break;
    default:
      break;
  }

  return {
    ...state,
    [action.type]: action.stateKey
  };
};

const Keyboard = props => {
  // eslint-disable-next-line
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const renderKeys = (noteList = []) =>
    noteList.map(({ note }) => (
      <div
        key={note}
        id={note}
        style={
          note.indexOf("#") > -1
            ? { ...sharpKeyStyles, ...keyStyles }
            : { ...naturalKeyStyles, ...keyStyles }
        }
        onMouseDown={e =>
          dispatch({
            type: "down",
            pitch: note,
            synth: props.synth
          })
        }
        onMouseUp={e =>
          dispatch({
            type: "up",
            pitch: note,
            synth: props.synth
          })
        }
        onMouseLeave={e =>
          dispatch({
            type: "up",
            pitch: note,
            synth: props.synth
          })
        }
      ></div>
    ));

  return <div style={containerStyles}>{renderKeys(KEYBOARD)}</div>;
};

export default Keyboard;
