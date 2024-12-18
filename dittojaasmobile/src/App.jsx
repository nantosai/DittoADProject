import React from 'react';
import { CssBaseline, Container, ThemeProvider, createTheme } from '@mui/material';
import BookingFeature from './components/BookingFeature';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <h1 style={{ textAlign: 'center' }}>Jenderam Autoworks Booking</h1>
        <BookingFeature />
      </Container>
    </ThemeProvider>
  );
};

export default App;
