import React from "react";
import * as Tone from "tone";
import Container from "./Container";
import ThemeContext from "./ThemeContext";
import ThemeToggleButton from "./ThemeToggleButton";
import ErrorMessage from "./ErrorMessage";

const appContainerStyles = theme => {
  return {
    height: '100%',
    backgroundColor: (theme === 'light' ? 'white' : 'black')
  }
} 

const App = () => {
  const synth = new Tone.Synth().toMaster();
  const [theme,setTheme] = React.useState('light');

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div style={appContainerStyles(theme)}>
        <ThemeToggleButton toggleTheme={() => toggleTheme()}/>
        <ErrorMessage/>
        <Container synth={synth}/>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
