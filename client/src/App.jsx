import './App.css';
import AuthScreen from './pages/AuthScreen';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import HomeScreen from './pages/HomeScreen';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { useEffect } from 'react';



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
  const {loggedIn, login} = useContext(UserContext);
  useEffect(()=>{
    debugger;
    const token = localStorage.getItem('jwt'); 
    if(token && !loggedIn)
      login(token);
  },[loggedIn])

  return (
    <div className="App">
      <ThemeProvider theme={themeOptions}>
        {loggedIn ? <HomeScreen/> : <AuthScreen/>}
      </ThemeProvider>
    </div>
  );
}

export default App;
