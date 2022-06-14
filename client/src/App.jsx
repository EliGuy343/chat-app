import './App.css';
import AuthScreen from './pages/AuthScreen';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import HomeScreen from './pages/HomeScreen';



const themeOptions = createTheme({
  palette: {
    type: 'light',

    primary: {
      main: '#ad2d30',
    },
    secondary: {
      main: '#00469a',
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={themeOptions}>
        <HomeScreen/>
      </ThemeProvider>
    </div>
  );
}

export default App;
