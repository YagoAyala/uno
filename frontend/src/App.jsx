import React, { useMemo, useState, Suspense, lazy } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { ApolloProvider } from '@apollo/client';

import { client } from './api/graphql/client';
import ToastProvider from './ToastProvider';
import { ColorModeContext } from './contexts/ColorModeContext';

const BoardPage = lazy(() => import('./pages/BoardPage'));

const App = () => {
  const [mode, setMode] = useState(
    localStorage.getItem('colorMode') || 'light',
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prev => {
          const next = prev === 'light' ? 'dark' : 'light';
          localStorage.setItem('colorMode', next);
          document.documentElement.setAttribute('data-theme', next);
          return next;
        });
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
        shape: { borderRadius: 8 },
        typography: { fontFamily: 'Inter, sans-serif' },
        components: {
          MuiButton: {
            styleOverrides: { root: { textTransform: 'none' } },
          },
        },
      }),
    [mode],
  );

  return (
    <ApolloProvider client={client}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={null}>
            <BoardPage />
          </Suspense>
          <ToastProvider />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ApolloProvider>
  );
};

export default App;
