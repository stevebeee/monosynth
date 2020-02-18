import React from "react";

const INPUT_CONFIGS = [
  {
    label: "Attack",
    stateKey: "attack",
    type: "range",
    values: [{ value: 0 }],
    min: 0,
    max: 3,
    step: 0.1
  },
  {
    label: "Decay",
    stateKey: "decay",
    type: "range",
    values: [{ value: 0 }],
    min: 0,
    max: 3,
    step: 0.1
  },
  {
    label: "Sustain",
    stateKey: "sustain",
    type: "range",
    values: [{ value: 0 }],
    min: 0,
    max: 1,
    step: 0.1
  },
  {
    label: "Release",
    stateKey: "release",
    type: "range",
    values: [{ value: 0 }],
    min: 0,
    max: 3,
    step: 0.1
  }
];

const initialState = {
  attack: 0,
  decay: 0,
  sustain: 0,
  release: 0
};

const containerStyles = {
  width: "200px",
  textAlign: "center",
  margin: "100px auto 0px auto"
};

const reducer = (state, action = {}) => {
  action.env[action.type] = action.stateKey;

  return {
    ...state,
    [action.type]: action.stateKey
  };
};

const Envelope = props => {
  // eslint-disable-next-line
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const renderInputs = (inputConfigs = []) =>
    inputConfigs.map(
      ({
        label,
        stateKey,
        type,
        values = [],
        min = "",
        max = "",
        step = ""
      }) => (
        <div>
          <label htmlFor={stateKey}>
            {label}: {state[stateKey]}
          </label>
          {values.map((item, key) => (
            <div>
              <input
                key={item.value}
                id={item.value}
                name={stateKey}
                type={type}
                value={values.length > 1 ? item.value : state[stateKey]}
                min={min}
                max={max}
                step={step}
                onChange={e =>
                  dispatch({
                    type: stateKey,
                    stateKey: e.currentTarget.value,
                    env: props.env
                  })
                }
              />
            </div>
          ))}
        </div>
      )
    );

  return (
    <div style={containerStyles}>
      <h4>Envelope</h4>
      {renderInputs(INPUT_CONFIGS)}
    </div>
  );
};

export default Envelope;
