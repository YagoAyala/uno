import './index.css';
import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './api/graphql/client';
import BoardPage from './pages/BoardPage';
import ToastProvider from './ToastProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
        },
      }),
    [theme]
  );

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={muiTheme}>
        <div className="App">
          <BoardPage onToggleTheme={toggleTheme} theme={theme} />
          <ToastProvider />
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
