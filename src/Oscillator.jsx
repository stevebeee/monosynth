import React from "react";
import ThemeContext from "./ThemeContext";

const INPUT_CONFIGS = [
  {
    label: "Type",
    stateKey: "type",
    type: "radio",
    values: [
      { value: "sine" },
      { value: "square" },
      { value: "triangle" },
      { value: "sawtooth" }
    ]
  },
  {
    label: "Phase",
    stateKey: "phase",
    type: "range",
    values: [{ value: 0 }],
    min: 0,
    max: 360,
    step: 1
  },
  {
    label: "Detune",
    stateKey: "detune",
    type: "range",
    values: [{ value: 0 }],
    min: 0,
    max: 100,
    step: 1,
    setValue: true
  },
  {
    label: "Frequency",
    stateKey: "frequency",
    type: "range",
    values: [{ value: 440 }],
    min: 100,
    max: 2000,
    step: 10,
    setValue: true
  }
];

const initialState = {
  type: "sine",
  phase: 0,
  detune: 0,
  frequency: 440
};

const containerStyles = theme => {
  return {
    display: "inline-block",
    width: "200px",
    textAlign: "center",
    margin: "100px auto 0px auto",
    color: theme === 'light' ? 'black' : 'white'
  }
};

const reducer = (state, action = {}) => {
  if (action.setValue) {
    action.osc[action.type].value = action.stateKey;
  } else {
    action.osc[action.type] = action.stateKey;
  }

  return {
    ...state,
    [action.type]: action.stateKey
  };
};

const Oscillator = props => {
  // eslint-disable-next-line
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const context = ThemeContext;

  const renderInputs = (inputConfigs = []) =>
    inputConfigs.map(
      ({
        label,
        stateKey,
        type,
        values = [],
        checked = false,
        min = "",
        max = "",
        step = "",
        setValue = false
      }) => (
        <div>
          <label htmlFor={stateKey}>
            {label}: {state[stateKey]}
          </label>
          <br />
          {values.map((item, key) => (
            <input
              key={item.value}
              id={item.value}
              name={stateKey}
              type={type}
              value={values.length > 1 ? item.value : state[stateKey]}
              checked={item.value === state[stateKey]}
              min={min}
              max={max}
              step={step}
              onChange={e =>
                dispatch({
                  type: stateKey,
                  stateKey: e.currentTarget.value,
                  osc: props.osc,
                  setValue: setValue
                })
              }
            />
          ))}
        </div>
      )
    );

  return (
    <div style={containerStyles(context._currentValue)}>
      <h4>Oscillator</h4>
      {renderInputs(INPUT_CONFIGS)}
    </div>
  );
};

export default Oscillator;
